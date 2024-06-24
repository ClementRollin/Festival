import { Controller, Get, Post, Param, Body, Patch, Delete } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm/dist";

@Controller('events')
export class EventsController{
  constructor(@InjectDataSource() private bdd: DataSource) {}  // injection - communiquer avec TypeOrm - création du champ bdd
  @Get()
  async findAll() {
    return await this.bdd.query("SELECT * FROM evenement");  // Promesse - Envoi d'une promesse que le résultat arrive - supprime le temps d'attente
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bdd.query("SELECT * FROM evenement WHERE id_evenement = ?", [+id]);  // [+id] = cast pour faire planter le code si on ne rentre pas de numérique
  }

  @Post()
  async create(@Body() json): Promise<any> {
    let now = new Date();
    json.edition ||= 1;
    json.titre ||= "";
    json.description ||= "",
    json.debut ||= now;
    json.fin ||= now;
    let result = await this.bdd.query(
      "INSERT INTO evenement (id_edition, titre, description, debut, fin) VALUES (?,?,?,?,?)", [
        json.edition,
        json.titre,
        json.description,
        json.debut,
        json.fin
      ]);
      json.id = result.insertId;
      return json;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() json): Promise<any> {
    let find = await this.findOne(id);
    json.id ||= +IdleDeadline;
    json.edition ||= find.edition;
    json.titre ||= find.titre;
    json.description ||= find.description;
    json.debut ||= find.debut;
    json.fin ||= find.fin;
    await this.bdd.query(
      "UPDATE evenement SET id_edition=?, titre=?, description=?, debut=?, fin=? WHERE id_evenement=?", [
        json.edition,
        json.titre,
        json.description,
        json.debut,
        json.fin,
        json.id
      ]);
      return json;
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    this.bdd.query("DELETE FROM evenement WHERE id_evenement")
  }
}