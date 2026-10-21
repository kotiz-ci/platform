package kotiz.fixture.modulith.compliant.beta;

import kotiz.fixture.modulith.compliant.alpha.api.AlphaApi;

public class BetaClient {

  private final AlphaApi alpha;

  public BetaClient(AlphaApi alpha) {
    this.alpha = alpha;
  }

  public AlphaApi alpha() {
    return alpha;
  }
}
