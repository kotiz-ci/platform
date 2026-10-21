package ci.kotiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModule;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.core.NamedInterface;
import org.springframework.modulith.core.Violations;

class ModularityTest {

  private static final Set<String> INACTIVE_CONTEXTS =
      Set.of("health", "scoring", "wa", "growth", "ussd");

  private final ApplicationModules modules = ApplicationModules.of(KotizApplication.class);

  @Test
  void moduleBoundariesAreRespected() {
    modules.verify();
  }

  @Test
  void iamIsTheOnlyModuleAndExposesItsApiNamedInterface() {
    assertEquals(Set.of("iam"), moduleNames(modules));

    ApplicationModule iam = modules.getModuleByName("iam").orElseThrow();
    Set<String> interfaces =
        iam.getNamedInterfaces().stream().map(NamedInterface::getName).collect(Collectors.toSet());
    assertTrue(interfaces.contains("api"), () -> "Named interfaces of iam: " + interfaces);
  }

  @Test
  void noDeferredOrRetiredContextIsInitialized() {
    Set<String> initialized = moduleNames(modules);
    initialized.retainAll(INACTIVE_CONTEXTS);
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

  private static Set<String> moduleNames(ApplicationModules modules) {
    return modules.stream()
        .map(ApplicationModule::getIdentifier)
        .map(Object::toString)
        .collect(Collectors.toSet());
  }
}
