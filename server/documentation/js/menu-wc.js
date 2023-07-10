'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' : 'data-bs-target="#xs-controllers-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' :
                                            'id="xs-controllers-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' : 'data-bs-target="#xs-injectables-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' :
                                        'id="xs-injectables-links-module-AppModule-63991b63e1e0bd35ac3b80936fe291be3f3b31ff752d2d6b2ae10188313d3d43846d031e7a56a82f469a1a6242e68768bd415c8ac55555517a9c17804f8b4bf6"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' :
                                            'id="xs-controllers-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' :
                                        'id="xs-injectables-links-module-AuthModule-ff2a751cbe7ea7c55b5406d3b3298321b4962a9db666e8a77bf1945cf673f882a4d31882472feea5dffa678ce3b2bdf1b39b47c69c9f3c5f38e18b72dad7f8c5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAccessStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAccessStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-56ae0387b9b590195a6fad9d3e242e95f93df3fc4c641e4af0203eb0a6e4c8e7fee8e920c5a2a3418ebac4cf697aa06d9e52de8ee82554078cf44ca7dd0ce2e4"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-56ae0387b9b590195a6fad9d3e242e95f93df3fc4c641e4af0203eb0a6e4c8e7fee8e920c5a2a3418ebac4cf697aa06d9e52de8ee82554078cf44ca7dd0ce2e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-56ae0387b9b590195a6fad9d3e242e95f93df3fc4c641e4af0203eb0a6e4c8e7fee8e920c5a2a3418ebac4cf697aa06d9e52de8ee82554078cf44ca7dd0ce2e4"' :
                                        'id="xs-injectables-links-module-PrismaModule-56ae0387b9b590195a6fad9d3e242e95f93df3fc4c641e4af0203eb0a6e4c8e7fee8e920c5a2a3418ebac4cf697aa06d9e52de8ee82554078cf44ca7dd0ce2e4"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' :
                                            'id="xs-controllers-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' :
                                        'id="xs-injectables-links-module-UsersModule-c110006860d4dcc13a7a7c19959c3d70ba2c65129b9983f5a3aeb31a9a14aea8ed729a8005e1c7d8052c3e42e36fbc3d7fa562304273a7656ac9f62366e9ec0a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAccessGuard.html" data-type="entity-link" >JwtAccessGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});