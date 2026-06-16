import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'images'),
      serveRoot: '/images',
      serveStaticOptions: {
        index: false,
        setHeaders: (res) => { res.setHeader('Cache-Control', 'public, max-age=86400'); },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'music'),
      serveRoot: '/music',
      serveStaticOptions: {
        index: false,
        setHeaders: (res) => { res.setHeader('Cache-Control', 'public, max-age=86400'); },
      },
    }),
    // Serve React build (screen/dist) — phải để cuối cùng vì có fallback index.html cho mọi route không khớp
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'screen', 'dist'),
      exclude: ['/api*', '/images*', '/music*'],
    }),
    StoryModule,
  ],
})
export class AppModule {}
