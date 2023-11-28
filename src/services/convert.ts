type Data = {[key:string]: unknown}
export class Convert {
    private static buildFormData(data:Data, formData: FormData, parentKey?: string): FormData {
        for (const [key, value] of Object.entries(data)) {
            const newKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof Date) {
                formData.append(newKey, value.toISOString());
            } else if (Array.isArray(value)) {
                value.forEach((element, index) => {
                    const arrayKey = `${newKey}[${index}]`;
                    if (typeof element === 'object') {
                        this.buildFormData(element, formData, arrayKey);
                    } else {
                        formData.append(arrayKey, element);
                    }
                });
            } else if (typeof value === 'object' && value !== null) {
                this.buildFormData(value as never, formData, newKey);
            } else {
                formData.append(newKey, value as never);
            }
        }
        return formData;
    }

    public static jsonToFormData(data: Data, formData = new FormData()) {
        return this.buildFormData(data, formData);
    }
}
