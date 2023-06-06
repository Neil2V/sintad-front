export class JwtDto {
    token: string;
    bearer: string;
    username: string;
    authorities: string[];

    constructor(token: string, bearer: string, username: string, authorities: string[]){
        this.token = token;
        this.bearer = bearer;
        this.username = username;
        this.authorities = authorities;
    }
}
