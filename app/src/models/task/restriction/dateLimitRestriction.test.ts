import { describe, test } from "vitest";
import { DateLimitRestriction } from "~/models/task/restriction/dateLimitRestriction";

describe("DateLimitRestriction Tests", () => {
  const completedRestriction = new DateLimitRestriction(
    "47F87916-435C-47A6-8E9C-513AEF7D3A52",
    new Date("2021-01-01T00:00:00Z"),
    new Date("2020-12-31T00:00:00Z")
  );

  const completedJson = {
    id: "47F87916-435C-47A6-8E9C-513AEF7D3A52",
    limit: "2021-01-01T00:00:00Z",
    completedAt: "2020-12-31T00:00:00Z",
  };

  const uncompletedRestriction = new DateLimitRestriction(
    "47F87916-435C-47A6-8E9C-513AEF7D3A52",
    new Date("2021-01-01T00:00:00Z")
  );

  const uncompletedJson = {
    id: "47F87916-435C-47A6-8E9C-513AEF7D3A52",
    limit: "2021-01-01T00:00:00Z",
    completedAt: undefined,
  };

  test("encode Test", () => {
    expect(completedRestriction.encode()).toEqual(completedJson);
    expect(uncompletedRestriction.encode()).toEqual(uncompletedJson);
  });

  test("decode Test", () => {
    expect(DateLimitRestriction.decode(completedJson)).toEqual(
      completedRestriction
    );
    expect(DateLimitRestriction.decode(uncompletedJson)).toEqual(
      uncompletedRestriction
    );
  });

  test("isCompletedがundefinedならisCompletedがfalseを返す", () => {
    const restriction = new DateLimitRestriction(
      "47F87916-435C-47A6-8E9C-513AEF7D3A52",
      new Date("2021-01-01T00:00:00Z")
    );
    expect(restriction.isCompleted).toBeFalsy();
  });

  test("isCompletedが期限より前ならisCompletedがtrueを返す", () => {
    const restriction = new DateLimitRestriction(
      "47F87916-435C-47A6-8E9C-513AEF7D3A52",
      new Date("2021-01-01T00:00:00Z"),
      new Date("2020-12-31T00:00:00Z")
    );
    expect(restriction.isCompleted).toBeTruthy();
  });

  test("isCompletedが期限より後ならisCompletedがfalseを返す", () => {
    const restriction = new DateLimitRestriction(
      "47F87916-435C-47A6-8E9C-513AEF7D3A52",
      new Date("2021-01-01T00:00:00Z"),
      new Date("2021-01-02T00:00:00Z")
    );
    expect(restriction.isCompleted).toBeFalsy();
  });

  test("isCompletedが期限と同じならisCompletedがtrueを返す", () => {
    const restriction = new DateLimitRestriction(
      "47F87916-435C-47A6-8E9C-513AEF7D3A52",
      new Date("2021-01-01T00:00:00Z"),
      new Date("2021-01-01T00:00:00Z")
    );
    expect(restriction.isCompleted).toBeTruthy();
  });
});
