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
                                            'data-bs-target="#controllers-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' :
                                            'id="xs-controllers-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' :
                                        'id="xs-injectables-links-module-AppModule-c76349720c89113cbd377921bbe1f5301304b653b5ad97a51455e5cec4135ae943cafc49c0afc11f07e4ee411f349b927feed9e0a53ca78efabd2bfe50e6b93b"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' :
                                            'id="xs-controllers-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' :
                                        'id="xs-injectables-links-module-AuthModule-d7b24ad13bc166a7e375aa2d63399c80c6722d78731076b3f3d58a3cbbc865bed02089aea9f009b6bdeca7cdccce004b5392085290f1bf6a780813e3c6772c59"' }>
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
                                        'data-bs-target="#injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' :
                                        'id="xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
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
                                            'data-bs-target="#controllers-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' :
                                            'id="xs-controllers-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' :
                                        'id="xs-injectables-links-module-UsersModule-78be6dd7c4b8e8fc1f326ecc5d618ecc35d1d3404df24e28dd5b6e2d4573ed448bc5bfb5a99dc1056ca892cb36176c5d3687c7b6097ca1c1fc8a62694dc6a3fe"' }>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
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
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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