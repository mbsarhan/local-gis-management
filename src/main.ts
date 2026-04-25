import 'reflect-metadata';
import { NestFactory }            from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }              from './app.module';
import { GlobalExceptionFilter }  from './shared/filters/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const shouldLogRequests =
        (process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'development') &&
        process.env.LOG_REQUESTS === 'true';

    if (shouldLogRequests) {
        app.use((req: any, res: any, next: any) => {
            const start = Date.now();
            res.on('finish', () => {
                const ms = Date.now() - start;
                const method = req.method;
                const url = req.originalUrl ?? req.url;
                const status = res.statusCode;
                console.log(`${method} ${url} -> ${status} (${ms}ms)`);
            });
            next();
        });
    }

    // Global prefix — all routes will be /api/...
    app.setGlobalPrefix('api');

    // Global exception filter — handles all errors consistently
    app.useGlobalFilters(new GlobalExceptionFilter());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('local-gis-management Api')
        .setDescription('local-gis-management Api Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'access-token',
        )
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('docs', app, swaggerDocument, { useGlobalPrefix: true });

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`Server running on port ${port}`);
}

bootstrap();
