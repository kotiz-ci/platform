import { login } from "../../features/login";
import { label } from "../../shared/ui";

export const home = (): string => `${label} ${login()}`;
