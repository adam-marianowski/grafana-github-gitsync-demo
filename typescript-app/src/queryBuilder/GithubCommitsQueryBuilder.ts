import type { Builder, Dataquery } from "@grafana/grafana-foundation-sdk/cog";

export interface CustomQuery {
  // refId and hide are expected on all queries
  refId?: string;
  hide?: boolean;

  // query is specific to the CustomQuery type
  owner: string;
  repository: string;
  queryType: string;
  // Let cog know that CustomQuery is a Dataquery variant
  _implementsDataqueryVariant(): void;
}

export const defaultCustomQuery = (): CustomQuery => ({
  owner: "grafana",
  repository: "grafana",
  queryType: "commits",
  _implementsDataqueryVariant() {},
});

export default class GithubCommitsQueryBuilder implements Builder<Dataquery> {
  private readonly internal: CustomQuery;

  constructor(owner: string, repo: string, queryType: string) {
    this.internal = defaultCustomQuery();
    this.internal.owner = owner;
    this.internal.repository = repo;
    this.internal.queryType = queryType;
  }

  build(): CustomQuery {
    return this.internal;
  }

  refId(refId: string): this {
    this.internal.refId = refId;
    return this;
  }

  hide(hide: boolean): this {
    this.internal.hide = hide;
    return this;
  }
}
