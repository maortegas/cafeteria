const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Se espera un codigo de retorno 200, con un arreglo con mas de un elemento", async () => {
      const response = await request(server).get("/cafes").send();
      const arrayProducto = response.body;
      const status = response.statusCode;

      expect(status).toBe(200);
      expect(arrayProducto).toBeInstanceOf(Array);
      expect(arrayProducto.length).toBeGreaterThan(1);
    
    });

      it("Se espera con codigo de retorno 404 al tratar de eliminar el codigo 999", async () => {
        const jwt = "token";
      
        const response = await request(server)
          .delete(`/cafes/999`)
          .set("Authorization", jwt)
          .send();
        const status = response.statusCode;
        expect(status).toBe(404);
      });

     it("Se espera con codigo de retorno 201 al crear un cafe", async () => {
        const id = Math.floor(Math.random() * 999);
        const nombre = "Irlandes";
        const cafe = { id, nombre };
        const response = await request(server).post("/cafes").send(cafe);

        const cafes = response.body;
        const status = response.statusCode;
        expect(status).toBe(201);
        expect(cafes).toContainEqual(cafe);
    });

  it("Se espera con codigo de retorno 201 al actualizar un cafe que no existe", async () => {
    const jwt = "token";
    const response = await request(server)
      .put(`/cafes/999`)
      .set("Authorization", jwt)
      .send();

    expect(response.statusCode).toBe(400);
  });


});
