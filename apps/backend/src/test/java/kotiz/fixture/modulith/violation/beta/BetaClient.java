package kotiz.fixture.modulith.violation.beta;

import kotiz.fixture.modulith.violation.alpha.internal.AlphaInternal;

public class BetaClient {

  private final AlphaInternal alpha;

  public BetaClient(AlphaInternal alpha) {
    this.alpha = alpha;
  }

  public AlphaInternal alpha() {
    return alpha;
  }
}
