// OBS: Troquei o dayjs pelo formatador padrão do javascript pois o dayjs estava voltando 1 dia do que foi adicionado na fabricação ou validade
export default function formatarData(dataString: string): string {
    // Convertendo a string para um objeto Date
    const data = new Date(dataString);

    // Obtendo o dia, mês e ano em UTC
    const day = data.getUTCDate();
    const month = data.getUTCMonth() + 1; // Lembrando que os meses em JavaScript são baseados em zero, então somamos 1
    const year = data.getUTCFullYear();

    // Adicionando um zero à esquerda se o dia ou mês for menor que 10
    const daysFormater = day < 10 ? '0' + day : day.toString();
    const monthFormater = month < 10 ? '0' + month : month.toString();

    // Retornando a data formatada no formato DD/MM/AAAA
    return daysFormater + '/' + monthFormater + '/' + year;
}


export function formatarDataAndMinute(dataString: string): string {
    const data = new Date(dataString);

    
    const day = data.getUTCDate();
    const month = data.getUTCMonth() + 1; // Lembrando que os meses em JavaScript são baseados em zero, então somamos 1
    const year = data.getUTCFullYear();

    // Obtendo horas, minutos e segundos em UTC
    const seconds = data.getUTCSeconds();
    const minutes = data.getUTCMinutes();
    const hours = data.getUTCHours() - 5;


    const daysFormater = day < 10 ? '0' + day : day.toString();
    const monthFormater = month < 10 ? '0' + month : month.toString();
    const hoursFormater = hours < 10 ? '0' + hours : hours.toString();
    const minutesFormater = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsFormater = seconds < 10 ? '0' + seconds : seconds.toString();

    return daysFormater + '/' + monthFormater + '/' + year + " ás " + hoursFormater + ':' + minutesFormater + ':' + secondsFormater;
}
