import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // retornar un html con un mensaje de bienvenida y un boton de enlace hacia la documentacion swagger

    return `
    <html>
      <head>
        <title>API GATEWAY</title>
      </head>
      <body>
        <h1>API GATEWAY</h1>
        <p>API GATEWAY for the application</p>
        <a href="/docs">Documentation</a>
      </body>
    </html> 
    `;

  }
}
