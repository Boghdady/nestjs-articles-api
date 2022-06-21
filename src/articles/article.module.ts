import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from '@app/articles/article.controller';
import { ArticleEntity } from '@app/articles/article.entity';
import { ArticleService } from '@app/articles/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
