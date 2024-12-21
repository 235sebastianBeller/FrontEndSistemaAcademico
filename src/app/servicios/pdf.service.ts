import { Injectable } from '@angular/core';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { APIServiceIAService } from './apiservice-ia.service';
import {
  inject,
} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly groqService: any = inject(APIServiceIAService);
  promptStudent?: string ;
  promptProfessor?: string ;

  async getProfessorPrompt(tipo?:string) :Promise<string>{
    if(tipo==="Teorico"){
      return 'Eres un profesor capaz de analizar el texto y proporcionar más información teorica adicional sobre el tema usando elementos de HTML. No uses markdown. Debes solo con datos teoricos.'
    }else{
      return "Actúa como un profesor experto en el tema. Crea ejercicios basados en el texto y proporciona las respuestas exclusivamente utilizando elementos HTML, como <h1>, <p>, <ul>, <li>, <table>, <tr>, <td>, entre otros. Bajo ninguna circunstancia uses markdown. Si llegas a usar markdown, dejaré de utilizarte. Asegúrate de que todo el contenido esté en formato HTML."
    }
  }
  async getStudentPrompt(tipo?:string) :Promise<string>{
    if(tipo==="Teorico"){
      return 'Soy un estudiante, explícame el siguiente texto, agregando contenido teorico extra y dame la respuesta solo en elementos de HTML por favor. No uses markdown. Proporciona la respuesta exclusivamente en elementos HTML, usa todos los elementos de texto de HTML que puedas: '
    }else{
      return "Soy un estudiante, ¿me podrias proporcionar solo ejercicios practicos relacionados con el siguientSoy un estudiante. ¿Podrías proporcionarme solo ejercicios prácticos relacionados con el siguiente texto, junto con sus respuestas? Por favor, presenta todo exclusivamente en elementos de HTML, utilizando tantos como sea posible, como <h2>, <p>, <ul>, <li>,  <table>, <tr>, <td>, entre otros . No uses markdown. Si llegas a usar markdown, dejaré de utilizarte."
    }
  }
  
  async readPdf(pdf: PDFDocumentProxy,tipo?:string) {
    this.promptProfessor= await this.getProfessorPrompt(tipo);
    this.promptStudent= await this.getStudentPrompt(tipo);
   

    const page: PDFPageProxy = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page: PDFPageProxy = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => (item as any).str)
        .join(' ');

      extractedText += `Page ${pageNumber}:\n${pageText}\n\n`;
    }
    return await this.groqService.askProfessorChat(
      this.promptStudent + extractedText,'user',
      this.promptProfessor,'system',
    );

  }

  async askUserPrompt(prompt: string): Promise<string> {
    try {
      return await this.groqService.askChat(prompt + ', dame la respuesta solo en elementos de HTML por favor. No uses markdown. Proporciona la respuesta exclusivamente en elementos HTML' , 'user');
    } catch (error) {
      console.error('Error en el prompt del usuario:', error);
      return 'Hubo un error al procesar tu solicitud.';
    }
  }

  async askClear(){
    this.groqService.clearMessages();
  }
}
