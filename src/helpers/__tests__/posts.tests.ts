import getPaginationCount from '../posts';

describe("getPaginationCount", () => {
  it("totalPosts % LIMIT === 0", () => {
    const totalsPosts = 10;

    expect(getPaginationCount(totalsPosts)).toEqual(2);
  });

  it("totalPosts % LIMIT >0", () => {
    const totalsPosts = 16;
    expect(getPaginationCount(totalsPosts)).toEqual(4);
  });
});


