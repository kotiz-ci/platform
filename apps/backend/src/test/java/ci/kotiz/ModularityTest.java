package ci.kotiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModule;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.core.NamedInterface;
import org.springframework.modulith.core.Violations;

class ModularityTest {

  private static final Path CONTEXT_MAP = Path.of("../../CONTEXT-MAP.md");
  private static final Pattern CONTEXT_PATH = Pattern.compile("apps/backend/([a-z]+)/CONTEXT\\.md");
  private static final String ACTIVE_SECTION = "## Contextes actifs";

  private final ApplicationModules modules = ApplicationModules.of(KotizApplication.class);

  @Test
  void moduleBoundariesAreRespected() {
    modules.verify();
  }

  @Test
  void iamIsTheReferenceModuleAndExposesItsApiNamedInterface() {
    ApplicationModule iam = modules.getModuleByName("iam").orElseThrow();
    Set<String> interfaces =
        iam.getNamedInterfaces().stream().map(NamedInterface::getName).collect(Collectors.toSet());
    assertTrue(interfaces.contains("api"), () -> "Named interfaces of iam: " + interfaces);
  }

  @Test
  void everyModuleIsAnActiveContextOfTheContextMap() throws IOException {
    Set<String> active = contexts(activeSection());
    Set<String> inactive = contexts(Files.readString(CONTEXT_MAP));
    inactive.removeAll(active);
    assertFalse(active.isEmpty(), "No active context found in " + CONTEXT_MAP);
    assertFalse(inactive.isEmpty(), "No deferred or retired context found in " + CONTEXT_MAP);

    Set<String> initialized = moduleNames(modules);
    assertTrue(active.containsAll(initialized), () -> "Modules: " + initialized);
    initialized.retainAll(inactive);
    assertEquals(Set.of(), initialized);
  }

  @Test
  void accessThroughTheApiNamedInterfaceIsAllowed() {
    ApplicationModules compliant = fixture("compliant");

    compliant.verify();
  }

  @Test
  void accessToAnotherModuleInternalPackageIsRejected() {
    ApplicationModules violating = fixture("violation");

    Violations violations = assertThrows(Violations.class, violating::verify);
    assertTrue(
        violations.getMessage().contains("alpha.internal.AlphaInternal"), violations::getMessage);
  }

  // ApplicationModules exclut par défaut les classes de test ; les fixtures en sont.
  private static ApplicationModules fixture(String name) {
    return ApplicationModules.of("kotiz.fixture.modulith." + name, location -> true);
  }

  private static String activeSection() throws IOException {
    String map = Files.readString(CONTEXT_MAP);
    int start = map.indexOf(ACTIVE_SECTION);
    int end = map.indexOf("\n## ", start + ACTIVE_SECTION.length());
    return map.substring(start, end);
  }

  private static Set<String> contexts(String markdown) {
    Set<String> names = new HashSet<>();
    Matcher matcher = CONTEXT_PATH.matcher(markdown);
    while (matcher.find()) {
      names.add(matcher.group(1));
    }
    return names;
  }

  private static Set<String> moduleNames(ApplicationModules modules) {
    return modules.stream()
        .map(ApplicationModule::getIdentifier)
        .map(Object::toString)
        .collect(Collectors.toSet());
  }
}
