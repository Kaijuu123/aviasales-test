import React from 'react';
import moment from 'moment';

function Tickets(props) {
    let imgSrc = `//pics.avs.io/99/36/${props.data.carrier}.png`;

    //склонение окончаний
    function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    //проверка количества остановок и выдача релевантной нформации после
    function stopIs(data) {
        return data.length === 0 ? 'без' : data.length;
    }

    //рендер поля с информацией о количестве остановок
    function renderStops(data) {
        return `${stopIs(data)} ${declOfNum(data.length, ['пересадка', 'пересадки', 'пересадок'])} `
    }

    //перевод даты отбытия в формат чч:мм
    function dateDisplay(index) {
        let time = props.data.segments[index].date;
        let durationTime = props.data.segments[index].duration;
        let originTime = moment.utc(time).format('HH:mm');
        let destinationTime = moment.utc(time).add(durationTime, 'm').format('HH:mm');

        return `${originTime} - ${destinationTime} `;
    }

    //отображение количества времени в пути
    function durationDisplay(index) {
        let durationTime = props.data.segments[index].duration;
        return `${Math.floor(durationTime / 60)}ч ${durationTime % 60}м`;
    }

    //отображение цены в нужном формате
    function priceDisplay(price) {
        return new Intl.NumberFormat('ru-RU').format(price);
    }


    return (
        <div className="avia-block">
            <div className='top-block'>
                <div className='avia-total blue-text'>{priceDisplay(props.data.price)} Р</div>
                <div className='avia-logo'>
                    <img src={imgSrc} alt="" />
                </div>
            </div>
            <div className='departure-block'>
                <div className='departure-city'>
                    <div className='grey-text'>{props.data.segments[0].origin} – {props.data.segments[0].destination}</div>
                    <div className='black-text-lg'>{dateDisplay(0)}</div>
                </div>
                <div className='departure-time'>
                    <div className='grey-text'>В пути</div>
                    <div className='black-text-lg'>{durationDisplay(0)}</div>
                </div>
                <div className='departure-check'>
                    <div className='grey-text'>{renderStops(props.data.segments[0].stops)}</div>
                    <div className='black-text-lg'>{props.data.segments[0].stops.join(', ')}</div>
                </div>
            </div>
            <div className='destination-block'>
                <div className='destination-city'>
                    <div className='grey-text'>{props.data.segments[1].origin} – {props.data.segments[1].destination}</div>
                    <div className='black-text-lg'>{dateDisplay(1)}</div>
                </div>
                <div className='destination-time'>
                    <div className='grey-text'>В пути</div>
                    <div className='black-text-lg'>{durationDisplay(1)}</div>
                </div>
                <div className='destination-check'>
                    <div className='grey-text'>{renderStops(props.data.segments[1].stops)}</div>
                    <div className='black-text-lg'>{props.data.segments[1].stops.join(', ')}</div>
                </div>
            </div>
        </div>
    );
}

export default Tickets;