export class signInDto {
    access_token: string;
    grant_type = "password";
    expires_in: number;
    scope = "*";
}