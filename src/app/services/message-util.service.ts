import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageUtilService {
  constructor() {}

  showSuccessMessages(messages: any[], data: string, title?: string) {
    this.writeMessage(messages, "success", data, title ? title : "Success");
  }

  showInfoMessages(messages: any[], data: string, title?: string) {
    this.writeMessage(messages, "info", data, title ? title : "Info");
  }

  showErrorMessages(messages: any[], data: string, title?: string) {
    this.writeMessage(messages, "error", data, title ? title : "Error");
  }

  showWarnMessages(messages: any[], data: string, title?: string) {
    this.writeMessage(messages, "warn", data, title ? title : "Warning");
  }

  private writeMessage(
    messages: any[],
    severity: string,
    data: string,
    title: string
  ) {
    this.clearMessage(messages);
    messages.push({ severity: severity, summary: title, detail: data });
  }

  clearMessage(messages: any[]) {
    messages.splice(0, messages.length);
  }
}
