import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  createArticle() {
    return 'create article from service';
  }
}