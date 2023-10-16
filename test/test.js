const Blog = require("../models/blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Blogs API", () => {

    // delete all data at daatabases
    beforeEach(async () => {
        await Blog.deleteMany({});
    });

    // test get all data 
    describe("/GET blog", () => {
        it("it should GET all the blogs", (done) => {
            chai
                .request(app)
                .get("/api/v1/blogs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    // test create data
    describe("/POST blog", () => {
        it("it should new POST a blog", (done) => {
            let blog = {
                title: "This is the first blog",
                body: "This is a blog post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                createdAt: null,
            };
            chai
                .request(app)
                .post("/api/v1/blogs")
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("object");
                    res.body.status.should.be.eql(201);
                    done();
                });
        });
    });

    // test get 1 data 
    describe("/GET/:id blog", () => {
        it("it should GET a blog by the id", (done) => {
            let blog = new Blog({
                title: "This is the first blog",
                body: "This is a blog post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            });
    
            blog.save((err, blog) => {
                chai
                    .request(app)
                    .get("/api/v1/blogs/" + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success"); // Use a string like "success"
                        done();
                    });
            });
        });
    });
    
    // test update data
    describe("/PUT/:id blog", () => {
        it("it should UPDATE a blog given the id", (done) => {
            let blog = new Blog({
                title: "This is the first blog",
                body: "This is a blog post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                createdAt: null,
            });
            blog.save((err, blog) => {
                console.log(blog.id);
                chai
                    .request(app)
                    .put("/api/v1/blogs/" + blog.id)
                    .send({
                        title: "This is the first blog",
                        body: "This is a blog post",
                        image:
                            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        createdAt: null,
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql(200);
                        done();
                    });
            });
        });
    });

    // test delete data
    describe("/DELETE/:id blog", () => {
        it("it should DELETE a blog given the id", (done) => {
            let blog = new Blog({
                title: "This is the first blog",
                body: "This is a blog post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                createdAt: null,
            });
            blog.save((err, blog) => {
                chai
                    .request(app)
                    .delete("/api/v1/blogs/" + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql(200);
                        done();
                    });
            });
        });
    });
});
