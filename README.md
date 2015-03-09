[![Build Status](https://travis-ci.org/miagebdx/website.svg?branch=master)](https://travis-ci.org/miagebdx/website)

Copyright [2015] [miagebdx]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


#Technology

##Client side

- [Twitter Bootstrap](http://getbootstrap.com/)
- [AngularJS](https://www.angularjs.org/)
- Full internationalization with [Angular Translate](http://angular-translate.github.io/)
- [Compass](http://compass-style.org/) / [Sass](http://sass-lang.com/)
- [Bower](http://bower.io/)
- [Grunt](http://gruntjs.com/)
- [Karma](https://karma-runner.github.io/0.8/index.html) / [PhantomJS](http://phantomjs.org/)

##Server side

- [Spring Boot](http://projects.spring.io/spring-boot/)
- [Maven](https://maven.apache.org/) for building, testing and running the application
- [Spring Security](http://projects.spring.io/spring-security/)
- [Spring MVC REST](http://spring.io/blog/2009/03/08/rest-in-spring-3-mvc/)
- [Spring Data JPA](http://projects.spring.io/spring-data-jpa/) + Bean Validation
- Database updates with [Liquibase](http://www.liquibase.org/)
- [MySQL](https://www.mysql.com/) database

#Install

```sh
npm install
bower install
mvn spring-boot:run
```

##Project structure

```
.
├── Dockerfile
├── Gruntfile.js
├── README.md
├── bower.json
├── node_modules
├── package.json
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── miagebdx
    │   │           └── website
    │   │               ├── Application.java
    │   │               ├── ApplicationWebXml.java
    │   │               ├── aop
    │   │               │   └── logging
    │   │               │       └── LoggingAspect.java
    │   │               ├── async
    │   │               │   ├── ExceptionHandlingAsyncTaskExecutor.java
    │   │               │   └── package-info.java
    │   │               ├── config
    │   │               │   ├── AsyncConfiguration.java
    │   │               │   ├── CacheConfiguration.java
    │   │               │   ├── CloudDatabaseConfiguration.java
    │   │               │   ├── Constants.java
    │   │               │   ├── DatabaseConfiguration.java
    │   │               │   ├── JacksonConfiguration.java
    │   │               │   ├── LocaleConfiguration.java
    │   │               │   ├── LoggingAspectConfiguration.java
    │   │               │   ├── MailConfiguration.java
    │   │               │   ├── MetricsConfiguration.java
    │   │               │   ├── SecurityConfiguration.java
    │   │               │   ├── ThymeleafConfiguration.java
    │   │               │   ├── WebConfigurer.java
    │   │               │   ├── apidoc
    │   │               │   │   ├── SwaggerConfiguration.java
    │   │               │   │   └── package-info.java
    │   │               │   ├── audit
    │   │               │   │   ├── AuditEventConverter.java
    │   │               │   │   └── package-info.java
    │   │               │   ├── locale
    │   │               │   │   ├── AngularCookieLocaleResolver.java
    │   │               │   │   └── package-info.java
    │   │               │   ├── metrics
    │   │               │   │   ├── DatabaseHealthIndicator.java
    │   │               │   │   ├── JHipsterHealthIndicatorConfiguration.java
    │   │               │   │   ├── JavaMailHealthIndicator.java
    │   │               │   │   └── package-info.java
    │   │               │   └── package-info.java
    │   │               ├── domain
    │   │               │   ├── AbstractAuditingEntity.java
    │   │               │   ├── Article.java
    │   │               │   ├── Authority.java
    │   │               │   ├── Event.java
    │   │               │   ├── Hashtag.java
    │   │               │   ├── Partner.java
    │   │               │   ├── People.java
    │   │               │   ├── PersistentAuditEvent.java
    │   │               │   ├── PersistentToken.java
    │   │               │   ├── User.java
    │   │               │   ├── package-info.java
    │   │               │   └── util
    │   │               │       ├── CustomDateTimeDeserializer.java
    │   │               │       ├── CustomDateTimeSerializer.java
    │   │               │       ├── CustomLocalDateSerializer.java
    │   │               │       └── ISO8601LocalDateDeserializer.java
    │   │               ├── repository
    │   │               │   ├── ArticleRepository.java
    │   │               │   ├── AuthorityRepository.java
    │   │               │   ├── CustomAuditEventRepository.java
    │   │               │   ├── EventRepository.java
    │   │               │   ├── HashtagRepository.java
    │   │               │   ├── PartnerRepository.java
    │   │               │   ├── PeopleRepository.java
    │   │               │   ├── PersistenceAuditEventRepository.java
    │   │               │   ├── PersistentTokenRepository.java
    │   │               │   ├── UserRepository.java
    │   │               │   └── package-info.java
    │   │               ├── security
    │   │               │   ├── AjaxAuthenticationFailureHandler.java
    │   │               │   ├── AjaxAuthenticationSuccessHandler.java
    │   │               │   ├── AjaxLogoutSuccessHandler.java
    │   │               │   ├── AuthoritiesConstants.java
    │   │               │   ├── CustomPersistentRememberMeServices.java
    │   │               │   ├── Http401UnauthorizedEntryPoint.java
    │   │               │   ├── SecurityUtils.java
    │   │               │   ├── SpringSecurityAuditorAware.java
    │   │               │   ├── UserDetailsService.java
    │   │               │   ├── UserNotActivatedException.java
    │   │               │   └── package-info.java
    │   │               ├── service
    │   │               │   ├── AuditEventService.java
    │   │               │   ├── MailService.java
    │   │               │   ├── UserService.java
    │   │               │   ├── package-info.java
    │   │               │   └── util
    │   │               │       └── RandomUtil.java
    │   │               └── web
    │   │                   ├── filter
    │   │                   │   ├── CachingHttpHeadersFilter.java
    │   │                   │   ├── CsrfCookieGeneratorFilter.java
    │   │                   │   ├── StaticResourcesProductionFilter.java
    │   │                   │   ├── gzip
    │   │                   │   │   ├── GZipResponseUtil.java
    │   │                   │   │   ├── GZipServletFilter.java
    │   │                   │   │   ├── GZipServletOutputStream.java
    │   │                   │   │   ├── GZipServletResponseWrapper.java
    │   │                   │   │   ├── GzipResponseHeadersNotModifiableException.java
    │   │                   │   │   └── package-info.java
    │   │                   │   └── package-info.java
    │   │                   ├── propertyeditors
    │   │                   │   ├── LocaleDateTimeEditor.java
    │   │                   │   └── package-info.java
    │   │                   └── rest
    │   │                       ├── AccountResource.java
    │   │                       ├── ArticleResource.java
    │   │                       ├── AuditResource.java
    │   │                       ├── EventResource.java
    │   │                       ├── HashtagResource.java
    │   │                       ├── LogsResource.java
    │   │                       ├── PartnerResource.java
    │   │                       ├── PeopleResource.java
    │   │                       ├── UserResource.java
    │   │                       ├── dto
    │   │                       │   ├── LoggerDTO.java
    │   │                       │   ├── UserDTO.java
    │   │                       │   └── package-info.java
    │   │                       └── package-info.java
    │   ├── resources
    │   │   ├── banner.txt
    │   │   ├── config
    │   │   │   ├── application-dev.yml
    │   │   │   ├── application-prod.yml
    │   │   │   ├── application.yml
    │   │   │   └── liquibase
    │   │   │       ├── authorities.csv
    │   │   │       ├── changelog
    │   │   │       │   ├── 00000000000000_initial_schema.xml
    │   │   │       │   ├── 20150118210203_added_entity_People.xml
    │   │   │       │   ├── 20150118210402_added_entity_Partner.xml
    │   │   │       │   ├── 20150118210436_added_entity_Hashtag.xml
    │   │   │       │   ├── 20150118210618_added_entity_Article.xml
    │   │   │       │   └── 20150118210841_added_entity_Event.xml
    │   │   │       ├── master.xml
    │   │   │       ├── users.csv
    │   │   │       └── users_authorities.csv
    │   │   ├── ehcache.xml
    │   │   ├── i18n
    │   │   │   ├── messages_en.properties
    │   │   │   └── messages_fr.properties
    │   │   ├── logback.xml
    │   │   ├── mails
    │   │   │   └── activationEmail.html
    │   │   └── templates
    │   │       └── error.html
    │   ├── scss
    │   │   ├── angular-loading-bar.scss
    │   │   ├── googlemaps.scss
    │   │   ├── main.scss
    │   │   ├── miagebdx.scss
    │   │   ├── navbar.scss
    │   │   ├── ng-animation.scss
    │   │   └── slides.scss
    │   └── webapp
    │       ├── assets
    │       │   ├── images
    │       │   │   ├── 001.jpg
    │       │   │   ├── 002.jpg
    │       │   │   ├── 003.jpg
    │       │   │   ├── 004.jpg
    │       │   │   ├── 005.jpg
    │       │   │   ├── development_ribbon.png
    │       │   │   ├── logo_fr.svg
    │       │   │   └── miage-logo.png
    │       │   └── styles
    │       │       └── place\ to\ sass\ compile
    │       ├── favicon.ico
    │       ├── i18n
    │       │   ├── en
    │       │   │   ├── activate.json
    │       │   │   ├── article.json
    │       │   │   ├── audits.json
    │       │   │   ├── configuration.json
    │       │   │   ├── error.json
    │       │   │   ├── event.json
    │       │   │   ├── global.json
    │       │   │   ├── hashtag.json
    │       │   │   ├── health.json
    │       │   │   ├── language.json
    │       │   │   ├── login.json
    │       │   │   ├── logs.json
    │       │   │   ├── main.json
    │       │   │   ├── metrics.json
    │       │   │   ├── partner.json
    │       │   │   ├── password.json
    │       │   │   ├── people.json
    │       │   │   ├── register.json
    │       │   │   ├── sessions.json
    │       │   │   └── settings.json
    │       │   └── fr
    │       │       ├── activate.json
    │       │       ├── article.json
    │       │       ├── audits.json
    │       │       ├── configuration.json
    │       │       ├── error.json
    │       │       ├── event.json
    │       │       ├── global.json
    │       │       ├── hashtag.json
    │       │       ├── health.json
    │       │       ├── language.json
    │       │       ├── login.json
    │       │       ├── logs.json
    │       │       ├── main.json
    │       │       ├── metrics.json
    │       │       ├── partner.json
    │       │       ├── password.json
    │       │       ├── people.json
    │       │       ├── register.json
    │       │       ├── sessions.json
    │       │       └── settings.json
    │       ├── index.html
    │       ├── robots.txt
    │       ├── scripts
    │       │   ├── app
    │       │   │   ├── account
    │       │   │   │   ├── account.js
    │       │   │   │   ├── activate
    │       │   │   │   │   ├── activate.controller.js
    │       │   │   │   │   ├── activate.html
    │       │   │   │   │   └── activate.js
    │       │   │   │   ├── login
    │       │   │   │   │   ├── login.controller.js
    │       │   │   │   │   ├── login.html
    │       │   │   │   │   └── login.js
    │       │   │   │   ├── logout
    │       │   │   │   │   ├── logout.controller.js
    │       │   │   │   │   └── logout.js
    │       │   │   │   ├── password
    │       │   │   │   │   ├── password.controller.js
    │       │   │   │   │   ├── password.directive.js
    │       │   │   │   │   ├── password.html
    │       │   │   │   │   └── password.js
    │       │   │   │   ├── register
    │       │   │   │   │   ├── register.controller.js
    │       │   │   │   │   ├── register.html
    │       │   │   │   │   └── register.js
    │       │   │   │   ├── sessions
    │       │   │   │   │   ├── sessions.controller.js
    │       │   │   │   │   ├── sessions.html
    │       │   │   │   │   └── sessions.js
    │       │   │   │   └── settings
    │       │   │   │       ├── settings.controller.js
    │       │   │   │       ├── settings.html
    │       │   │   │       └── settings.js
    │       │   │   ├── admin
    │       │   │   │   ├── admin.js
    │       │   │   │   ├── audits
    │       │   │   │   │   ├── audits.controller.js
    │       │   │   │   │   ├── audits.html
    │       │   │   │   │   └── audits.js
    │       │   │   │   ├── configuration
    │       │   │   │   │   ├── configuration.controller.js
    │       │   │   │   │   ├── configuration.html
    │       │   │   │   │   └── configuration.js
    │       │   │   │   ├── docs
    │       │   │   │   │   ├── docs.html
    │       │   │   │   │   └── docs.js
    │       │   │   │   ├── health
    │       │   │   │   │   ├── health.controller.js
    │       │   │   │   │   ├── health.html
    │       │   │   │   │   └── health.js
    │       │   │   │   ├── logs
    │       │   │   │   │   ├── logs.controller.js
    │       │   │   │   │   ├── logs.html
    │       │   │   │   │   └── logs.js
    │       │   │   │   └── metrics
    │       │   │   │       ├── metrics.controller.js
    │       │   │   │       ├── metrics.html
    │       │   │   │       └── metrics.js
    │       │   │   ├── app.js
    │       │   │   ├── entities
    │       │   │   │   ├── article
    │       │   │   │   │   ├── article-detail.controller.js
    │       │   │   │   │   ├── article-detail.html
    │       │   │   │   │   ├── article.controller.js
    │       │   │   │   │   ├── article.js
    │       │   │   │   │   ├── articles-list.html
    │       │   │   │   │   └── articles.html
    │       │   │   │   ├── entity.js
    │       │   │   │   ├── event
    │       │   │   │   │   ├── event-detail.controller.js
    │       │   │   │   │   ├── event-detail.html
    │       │   │   │   │   ├── event.controller.js
    │       │   │   │   │   ├── event.js
    │       │   │   │   │   ├── events-list.html
    │       │   │   │   │   └── events.html
    │       │   │   │   ├── hashtag
    │       │   │   │   │   ├── hashtag-detail.controller.js
    │       │   │   │   │   ├── hashtag-detail.html
    │       │   │   │   │   ├── hashtag.controller.js
    │       │   │   │   │   ├── hashtag.js
    │       │   │   │   │   └── hashtags.html
    │       │   │   │   ├── partner
    │       │   │   │   │   ├── partner-detail.controller.js
    │       │   │   │   │   ├── partner-detail.html
    │       │   │   │   │   ├── partner.controller.js
    │       │   │   │   │   ├── partner.js
    │       │   │   │   │   └── partners.html
    │       │   │   │   └── people
    │       │   │   │       ├── people-detail.controller.js
    │       │   │   │       ├── people-detail.html
    │       │   │   │       ├── people.controller.js
    │       │   │   │       ├── people.js
    │       │   │   │       └── peoples.html
    │       │   │   ├── error
    │       │   │   │   ├── accessdenied.html
    │       │   │   │   ├── error.html
    │       │   │   │   └── error.js
    │       │   │   └── main
    │       │   │       ├── main.controller.js
    │       │   │       ├── main.html
    │       │   │       └── main.js
    │       │   └── components
    │       │       ├── admin
    │       │       │   ├── audits.service.js
    │       │       │   ├── configuration.service.js
    │       │       │   ├── logs.service.js
    │       │       │   └── monitoring.service.js
    │       │       ├── auth
    │       │       │   ├── auth.service.js
    │       │       │   ├── principal.service.js
    │       │       │   ├── provider
    │       │       │   │   └── auth.session.service.js
    │       │       │   └── services
    │       │       │       ├── account.service.js
    │       │       │       ├── activate.service.js
    │       │       │       ├── password.service.js
    │       │       │       ├── register.service.js
    │       │       │       └── sessions.service.js
    │       │       ├── base64-upload
    │       │       │   └── upload.directive.js
    │       │       ├── cnil
    │       │       │   ├── cnil.directive.js
    │       │       │   └── cnil.html
    │       │       ├── entities
    │       │       │   ├── article
    │       │       │   │   ├── article.directive.js
    │       │       │   │   ├── article.service.js
    │       │       │   │   ├── articleHashtag.service.js
    │       │       │   │   └── articlePeople.service.js
    │       │       │   ├── event
    │       │       │   │   ├── event.directive.js
    │       │       │   │   ├── event.service.js
    │       │       │   │   ├── eventPartner.service.js
    │       │       │   │   └── eventPeople.service.js
    │       │       │   ├── hashtag
    │       │       │   │   └── hashtag.service.js
    │       │       │   ├── partner
    │       │       │   │   └── partner.service.js
    │       │       │   └── people
    │       │       │       └── people.service.js
    │       │       ├── form
    │       │       │   └── form.directive.js
    │       │       ├── googleMaps
    │       │       │   └── gMapsAutoComplete.js
    │       │       ├── language
    │       │       │   ├── language.controller.js
    │       │       │   └── language.service.js
    │       │       ├── markdown
    │       │       │   └── markdown.directive.js
    │       │       ├── navbar
    │       │       │   ├── navbar.controller.js
    │       │       │   ├── navbar.directive.js
    │       │       │   └── navbar.html
    │       │       └── util
    │       │           ├── base64.service.js
    │       │           └── truncate.filter.js
    │       └── swagger-ui
    │           ├── images
    │           │   └── throbber.gif
    │           └── index.html
    └── test
        ├── java
        │   └── com
        │       └── miagebdx
        │           └── website
        │               ├── security
        │               │   └── SecurityUtilsTest.java
        │               ├── service
        │               │   └── UserServiceTest.java
        │               └── web
        │                   └── rest
        │                       ├── AccountResourceTest.java
        │                       ├── ArticleResourceTest.java
        │                       ├── EventResourceTest.java
        │                       ├── HashtagResourceTest.java
        │                       ├── PartnerResourceTest.java
        │                       ├── PeopleResourceTest.java
        │                       ├── TestUtil.java
        │                       └── UserResourceTest.java
        ├── javascript
        │   ├── karma.conf.js
        │   └── spec
        │       ├── app
        │       │   └── account
        │       │       ├── login
        │       │       │   └── loginControllerSpec.js
        │       │       ├── password
        │       │       │   ├── passwordControllerSpec.js
        │       │       │   └── passwordDirectiveSpec.js
        │       │       ├── sessions
        │       │       │   └── sessionsControllerSpec.js
        │       │       └── settings
        │       │           └── settingsControllerSpec.js
        │       └── components
        │           └── auth
        │               └── authServicesSpec.js
        └── resources
            ├── config
            │   └── application.yml
            ├── ehcache.xml
            └── logback-test.xml

```
