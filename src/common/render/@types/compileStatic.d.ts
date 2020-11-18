interface compileTemplateStatic {
    templateSettings: any
   
    (template: string): string;
    (template: string,data:Object): string;
}
