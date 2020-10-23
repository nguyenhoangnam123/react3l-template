import { Repository } from "@react3l/react3l/core";
import { httpConfig } from "config/http";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { DISCUSSION_ROUTE } from "config/api-consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post, PostFilter } from "models/Post";
import { AxiosResponse } from "axios";
import { FileModel } from "components/Utility/ChatBox/ChatBox.model";
import nameof from "ts-nameof.macro";
export class DisscusionRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, DISCUSSION_ROUTE);
  }

  public list = (filter: PostFilter): Observable<Post[]> => {
    return this.httpObservable
      .post<Post[]>(kebabCase(nameof(this.list)), filter)
      .pipe(map((response: AxiosResponse<Post[]>) => response.data));
  };

  public count = (filter: PostFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public create = (model: Post) => {
    return this.httpObservable
      .post<Post>(kebabCase(nameof(this.create)), model)
      .pipe(
        map((response: AxiosResponse<Post>) => Post.clone<Post>(response.data)),
      );
  };

  public delete = (model: Post): Observable<boolean> => {
    return this.httpObservable
      .post<boolean>(kebabCase(nameof(this.delete)), model)
      .pipe(map((response: AxiosResponse<boolean>) => response.data));
  };

  public import = (
    file: File,
    params?: { [key: string]: any },
  ): Observable<FileModel> => {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.httpObservable
      .post<Post>(kebabCase(nameof(this.import)), formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params,
      })
      .pipe(map((response: AxiosResponse<FileModel>) => response.data));
  };
}

export const disscusionRepository = new DisscusionRepository();
