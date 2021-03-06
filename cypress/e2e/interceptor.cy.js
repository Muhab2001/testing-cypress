import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "../utils/graphql-test-utils";

context("Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://graphql.anilist.co/", (req) => {
      aliasQuery(req, "getMedia");
    });
  });
});

it("should not display original data and intercept", () => {
  cy.intercept("POST", "http://localhost:8000/", (req) => {
    const { body } = req;

    if (hasOperationName(req, "getMedia")) {
      req.alias = "gqlgetMediaQuery";
      // data mocking
      // req.reply((res) => {
      //   res.body.data.Media.title.romaji = "nopenope";
      //   res.body.data.Media.title.english = "meowmeow";
      //   console.log(res);
      // });
      req.reply({ fixture: "titleResponse.json" });
    }
  });


  cy.visit("/");

  cy.wait("@gqlgetMediaQuery").its("response.body.data.Media.title").should(
    (title) => {
      expect(title.romaji).to.equal("Changed it!")
      
      expect(title.english).to.equal("Cowboy changed!");
    }
  )
});
