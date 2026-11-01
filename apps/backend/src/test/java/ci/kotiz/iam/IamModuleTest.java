package ci.kotiz.iam;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.modulith.test.ApplicationModuleTest;
import org.springframework.modulith.test.ModuleTestExecution;
import org.springframework.test.context.TestPropertySource;

@ApplicationModuleTest
@TestPropertySource(
    properties = {
      "spring.datasource.url=jdbc:h2:mem:kotiz-iam-module",
      "spring.datasource.driver-class-name=org.h2.Driver",
      "spring.datasource.username=sa",
      "spring.datasource.password=",
      "spring.flyway.enabled=false"
    })
class IamModuleTest {

  @Autowired private ModuleTestExecution execution;

  @Test
  void iamBootstrapsAloneWithoutDependingOnAnotherModule() {
    assertEquals("iam", execution.getModule().getIdentifier().toString());
    assertEquals(List.of(), execution.getDependencies());
  }
}
