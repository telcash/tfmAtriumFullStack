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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupPipe = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const hash_service_1 = require("../../common/services/hash.service");
const user_role_1 = require("../../users/constants/user-role");
let SignupPipe = exports.SignupPipe = class SignupPipe {
    constructor(req, hashService) {
        this.req = req;
        this.hashService = hashService;
    }
    async transform(createUserDto, metadata) {
        const hashedPassword = await this.hashService.hashData(createUserDto.password);
        if (!this.req.user || (this.req.user && this.req.user.role !== user_role_1.UserRole.ADMIN)) {
            createUserDto.role = user_role_1.UserRole.CLIENT;
        }
        createUserDto = Object.assign(Object.assign({}, createUserDto), { password: hashedPassword, refreshToken: null });
        return createUserDto;
    }
};
exports.SignupPipe = SignupPipe = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, hash_service_1.HashService])
], SignupPipe);
//# sourceMappingURL=signup.pipe.js.map