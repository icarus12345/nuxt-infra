import { useAuthStore } from "@gateways";
import { $AuthRepository } from "@repositories";
import { IAuthIdentity } from "@interfaces";

export class LoginUseCase {
  static async execute(username: string, password: string, rememberMe: boolean): Promise<boolean> {
    const $AuthStore = useAuthStore()
    // Giả sử đây là lời gọi API để đăng nhập
    const identity: IAuthIdentity = await $AuthRepository.login(username, password);
    if (identity) {
      $AuthStore.setIdentity(identity);
      return true;
    }
    return false;
  }
}