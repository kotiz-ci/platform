package ci.kotiz.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.MountableFile;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostgresMigrationIntegrationTest {

  private static final String MIGRATION_USER = "kotiz_migrator";
  private static final String MIGRATION_PASSWORD = "migration-test-password";
  private static final String APPLICATION_USER = "kotiz_app";
  private static final String APPLICATION_PASSWORD = "application-test-password";

  @Container
  static final PostgreSQLContainer POSTGRES =
      new PostgreSQLContainer("postgres:15.19-alpine3.24")
          .withDatabaseName("kotiz_test")
          .withUsername("kotiz_admin")
          .withPassword("admin-test-password")
          .withCopyFileToContainer(
              MountableFile.forHostPath(repoFile("infra/docker/initdb/01-create-roles.sh"), 0755),
              "/docker-entrypoint-initdb.d/01-create-roles.sh")
          .withCopyFileToContainer(
              MountableFile.forClasspathResource(
                  "postgresql/secrets/postgres_migration_password", 0444),
              "/run/secrets/postgres_migration_password")
          .withCopyFileToContainer(
              MountableFile.forClasspathResource("postgresql/secrets/postgres_app_password", 0444),
              "/run/secrets/postgres_app_password");

  @Autowired private Flyway flyway;

  @DynamicPropertySource
  static void configureDatabase(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
    registry.add("spring.datasource.username", () -> APPLICATION_USER);
    registry.add("spring.datasource.password", () -> APPLICATION_PASSWORD);
    registry.add("spring.flyway.url", POSTGRES::getJdbcUrl);
    registry.add("spring.flyway.user", () -> MIGRATION_USER);
    registry.add("spring.flyway.password", () -> MIGRATION_PASSWORD);
  }

  @AfterAll
  static void removeProbeTable() throws SQLException {
    try (Connection connection = migrationConnection();
        Statement statement = connection.createStatement()) {
      statement.execute("DROP TABLE IF EXISTS migration_privilege_probe");
    }
  }

  @Test
  void migrationRoleCanCreateAlterAndDropSchemaObjects() throws SQLException {
    try (Connection connection = migrationConnection();
        Statement statement = connection.createStatement()) {
      try {
        statement.execute("CREATE TABLE migration_privilege_probe (id bigint)");
        statement.execute("ALTER TABLE migration_privilege_probe ADD COLUMN label text");
      } finally {
        statement.execute("DROP TABLE IF EXISTS migration_privilege_probe");
      }
    }
  }

  @Test
  void applicationRoleCannotCreateOrAlterSchemaObjects() throws SQLException {
    try (Connection connection = applicationConnection();
        Statement statement = connection.createStatement()) {
      SQLException createError =
          assertThrows(
              SQLException.class,
              () -> statement.execute("CREATE TABLE forbidden_application_table (id bigint)"));
      SQLException alterError =
          assertThrows(
              SQLException.class,
              () ->
                  statement.execute(
                      "ALTER TABLE flyway_schema_history ADD COLUMN forbidden_column text"));

      assertEquals("42501", createError.getSQLState());
      assertEquals("42501", alterError.getSQLState());
    }
  }

  @Test
  void startupAppliesTechnicalMigrationExactlyOnce() throws SQLException {
    assertEquals(1, migrationExecutionCount());

    flyway.migrate();

    assertEquals(1, migrationExecutionCount());
  }

  @Test
  void technicalMigrationCreatesNoBusinessTable() throws SQLException {
    try (Connection connection = migrationConnection();
        Statement statement = connection.createStatement();
        ResultSet tables =
            statement.executeQuery(
                "SELECT count(*) FROM information_schema.tables "
                    + "WHERE table_schema = 'public' AND table_name <> 'flyway_schema_history'")) {
      tables.next();
      assertEquals(0, tables.getInt(1));
    }
  }

  private static int migrationExecutionCount() throws SQLException {
    try (Connection connection = migrationConnection();
        Statement statement = connection.createStatement();
        ResultSet migrations =
            statement.executeQuery(
                "SELECT count(*) FROM flyway_schema_history "
                    + "WHERE version = '1' AND success = true")) {
      migrations.next();
      return migrations.getInt(1);
    }
  }

  private static Connection migrationConnection() throws SQLException {
    return DriverManager.getConnection(POSTGRES.getJdbcUrl(), MIGRATION_USER, MIGRATION_PASSWORD);
  }

  private static Connection applicationConnection() throws SQLException {
    return DriverManager.getConnection(
        POSTGRES.getJdbcUrl(), APPLICATION_USER, APPLICATION_PASSWORD);
  }

  private static Path repoFile(String relativePath) {
    Path directory = Path.of("").toAbsolutePath();
    while (directory != null) {
      Path candidate = directory.resolve(relativePath);
      if (Files.isRegularFile(candidate)) {
        return candidate;
      }
      directory = directory.getParent();
    }
    throw new IllegalStateException("Repository file not found: " + relativePath);
  }
}
