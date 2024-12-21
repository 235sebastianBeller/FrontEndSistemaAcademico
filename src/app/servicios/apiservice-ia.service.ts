import { Injectable } from '@angular/core';
import Groq from 'groq-sdk';
import {environment} from "@envs/environment"
@Injectable({
  providedIn: 'root',
})
export class APIServiceIAService {
  private readonly groq: any;
  private messages: { role: string; content: string }[] = [];

  constructor() {
    this.groq = new Groq({
      apiKey: environment.API_GROK,
      dangerouslyAllowBrowser: true,
    });
  }

  async askProfessorChat(
    promptFirstRole: string,
    firstRole: string,
    promptSecondRoleProfessor: string,
    secondRole: string
  ): Promise<string> {
    this.messages.push(
      { role: firstRole, content: promptFirstRole },
      { role: secondRole, content: promptSecondRoleProfessor }
    );

    try {
      const response = await this.groq.chat.completions.create({
        messages: this.messages,
        model: 'llama3-8b-8192',
      });
      const htmlResponse = response.choices[0].message.content;
      return htmlResponse;
    } catch (error) {
      console.error('Error en askProfessorChat:', error);
      throw new Error('Error al procesar la solicitud al chat del profesor.');
    }
  }

  async askChat(prompt: string, role: string): Promise<string> {
    this.messages.push({ role: role, content: prompt });

    try {
      const response = await this.groq.chat.completions.create({
        messages: this.messages, 
        model: 'llama3-8b-8192',
      });
      const htmlResponse = response.choices[0].message.content;
      return htmlResponse;
    } catch (error) {
      console.error('Error en askChat:', error);
      throw new Error('Error al procesar la solicitud del usuario.');
    }
  }

  clearMessages() {
    this.messages = [];
  }
}
