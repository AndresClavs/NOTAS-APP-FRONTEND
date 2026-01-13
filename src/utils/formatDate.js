import {format} from 'date-fns';
import {es} from 'date-fns/locale';

const formatData = (isoString) => {
    const date = new Date(isoString);
    return format(date, "dd 'de' MMMM 'de' yyyy, HH:mm", {locale: es});
}

export default formatData;