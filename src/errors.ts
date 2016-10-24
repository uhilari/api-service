export class ApiConfigNotFoundException implements Error {
	name: any;
	message: any;

	constructor(name: string){
		this.name = name;
		this.message = "No existe una configuración para '" + name + "'";
	}
}