export class SignInResponseData {
  token: string;
  refresh_token: string;
  user: any;
}

export class SignInResponseDto {
  data: SignInResponseData;
}
