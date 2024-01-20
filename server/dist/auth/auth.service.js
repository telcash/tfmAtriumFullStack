"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hash_service_1 = require("../common/services/hash.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
let AuthService = exports.AuthService = class AuthService {
    constructor(hashService, usersService, jwtService, configService) {
        this.hashService = hashService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async login(user) {
        const tokens = await this.getTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async validateUser(email, password) {
        if (!(0, class_validator_1.isEmail)(email) || !(0, class_validator_1.isStrongPassword)(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            throw new common_1.UnauthorizedException('Credentials format invalid');
        }
        const user = await this.usersService.findUserByEmail(email);
        if (!await this.hashService.isMatch(password, user.password)) {
            throw new common_1.UnauthorizedException('Password invalid');
        }
        return user;
    }
    async logout(id) {
        return await this.usersService.update(id, { refreshToken: null });
    }
    async updatePassword(id, updatePasswordDto) {
        return await this.usersService.update(id, updatePasswordDto);
    }
    async refreshTokens(id, refreshToken) {
        const user = await this.usersService.findUserById(id);
        if (!user.refreshToken || !await this.hashService.isMatch(refreshToken, user.refreshToken)) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user);
        await this.updateRefreshToken(id, tokens.refreshToken);
        return tokens;
    }
    async getTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '60m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async updateRefreshToken(id, refreshToken) {
        const hashedRefreshToken = await this.hashService.hashData(refreshToken);
        await this.usersService.update(id, { refreshToken: hashedRefreshToken });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hash_service_1.HashService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map