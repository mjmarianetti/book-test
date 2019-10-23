module.exports = {
  async up(db) {

    const institutions = [{
        name: "test",
        url: "test.com",
        emailDomain: "test.com"
      },
      {
        name: "test",
        url: "test.com",
        emailDomain: "test.com"
      }
    ];

    await db.collection('institutions').insertMany(institutions);

    const savedInstitutions = await db.collection('institutions').find({}).toArray();

    const books = [{
        isbn: "123",
        title: "title",
        author: "author",
        institutions: [savedInstitutions[0]._id]
      },
      {
        isbn: "456",
        title: "title2",
        author: "author2",
        institutions: [savedInstitutions[0]._id,
          savedInstitutions[1]._id
        ]
      },
      {
        isbn: "789",
        title: "title3",
        author: "author3",
        institutions: [savedInstitutions[1]._id]
      }
    ];

    await db.collection('books').insertMany(books);


  },

  async down(db) {
    await db.collection('institutions').remove({});
    await db.collection('books').remove({});
  }
};