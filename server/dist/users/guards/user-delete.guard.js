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
exports.UserDeleteGuard = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users.service");
const user_role_1 = require("../constants/user-role");
const auth_service_1 = require("../../auth/auth.service");
let UserDeleteGuard = exports.UserDeleteGuard = class UserDeleteGuard {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async canActivate(context) {
        let userId;
        let role;
        const req = context.switchToHttp().getRequest();
        if (req.url === '/users/profile') {
            userId = req.user.sub;
            role = req.user.role;
            await this.authService.validateUser(req.body.email, req.body.password);
        }
        else {
            userId = +req.params['id'];
            role = (await this.usersService.findUserById(userId)).role;
        }
        if (role === user_role_1.UserRole.ADMIN && await this.usersService.countUsersByRole(user_role_1.UserRole.ADMIN) <= 1) {
            throw new common_1.ConflictException("Can't delete or modify the only admin");
        }
        return true;
    }
};
exports.UserDeleteGuard = UserDeleteGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UserDeleteGuard);
//# sourceMappingURL=user-delete.guard.js.map