import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { signInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

@Controller('auth/token')
export class TokenController {
    constructor(
        private users: UsersService,
        private jwts: JwtService
    ) {}

    @Get()
    async signIn(@Headers("Authorization") auth: string) {
        const args = auth && auth.split(" ");
        if (args && args.length == 2 && args[0] == "Basic") {

            const credentials = Buffer.from(args[1], 'base64').toString('utf-8').split(":");
            const email = credentials[0];
            const password = credentials[1];
            const user = await this.users.findByEmail(email);
            if (user && await bcrypt.compare(password, user.hash)) {
                const cr = new signInDto();
                cr.expires_in = 3600;
                cr.access_token = this.jwts.sign({
                    id: user.id,
                    role: user.role,
                }, {
                    subject: email,
                    expiresIn: "1h"
                });
                return cr;
            }
        }
        throw new UnauthorizedException();
    }
}
