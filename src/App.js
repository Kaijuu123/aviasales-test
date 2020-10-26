import React, { Component } from 'react';
import Tickets from './components/tickets';
import Filter from './components/filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      searchType: 'cheap',
      loading: false,
      tickets: [],
      filteredTickets: [],
      stops: [
        {
          id: 1,
          name: 'allStops',
          checked: true,
          label: 'Все'
        },
        {
          id: 2,
          name: 'noStops',
          checked: false,
          label: 'Без пересадок'
        },
        {
          id: 3,
          name: 'oneStop',
          checked: false,
          label: '1 пересадка'
        },
        {
          id: 4,
          name: 'twoStops',
          checked: false,
          label: '2 пересадки'
        },
        {
          id: 5,
          name: 'threeStops',
          checked: false,
          label: '3 пересадки'
        },

      ]
    }
    this.getTickets = this.getTickets.bind(this);
    this.typeCheck = this.typeCheck.bind(this);
    this.searchTypeChange = this.searchTypeChange.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //получение всех билетов с сервера по полученному id
  async getTickets(id, tickets) {

    try {

      let data = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`).then(responce => responce.json());

      if (!data.stop) {
        data.tickets.forEach(function (item) {
          tickets.push(item);
        })
        this.getTickets(id, tickets);
      } else {
        data.tickets.forEach(function (item) {
          tickets.push(item);
        })

        this.setState({ tickets: tickets, loading: true });
      }
    } catch (error) {
      this.getTickets(id, tickets);
    }
  }

  //запрос id поиска и возврат билетов в виде массива в state
  componentDidMount() {
    fetch('https://front-test.beta.aviasales.ru/search')
      .then(responce => responce.json())
      .then(data => {
        let tickets = [];
        this.getTickets(data.searchId, tickets);
      });
  }

  //проверяем условия сортировки
  typeCheck(type, array) {
    if (type === 'cheap') {
      array.sort((a, b) => {
        return a.price - b.price
      })


    } else if (type === 'fast') {
      array.sort((a, b) => {
        return a.durationAll - b.durationAll
      })
    }
  }

  //смена значения searchType
  searchTypeChange(event) {
    this.setState({ searchType: event.target.getAttribute('data-search') });
  }

  //рендер билетов
  renderTickets(type) {
    let ticketsOld = this.state.tickets;
    let ticketsNew = [];

    //добавляем новое свойство в билет, общая сумма времени в пути для дальнейшего облегчения сортировки
    ticketsOld.forEach(ticket => {
      ticket.durationAll = ticket.segments[0].duration + ticket.segments[1].duration;
      ticketsNew.push(ticket);
    });

    this.typeCheck(type, ticketsNew);

    if (this.state.loading) {
      let ticketsComponent = ticketsNew.slice(0, 5).map(item => {
        return <Tickets key={Math.floor(Math.random() * 10000)} data={item} />
      })

      return ticketsComponent;
    } else {
      return (
        <div className='loadingImg'>
          <img src="/images/6.gif" alt="" />
        </div>
      );
    }
  }

  handleChange(id) {
    console.log(id);
    this.setState((prevState) => {
      const updatedStops = prevState.stops.map((stop) => {
        if (stop.id === id) {
          stop.ckecked = !stop.ckecked;
        }
        return stop;

      });

      console.log(updatedStops);

      return {
        stops: updatedStops
      };
    });
  }

  render() {
    return (
      <div className='container' >
        <a className='logo-block' href='index.html'>
          <img src="/images/Logo.png" alt="" />
        </a>
        <div className='tickets-container'>
          <Filter stops={this.state.stops} handleChange={this.handleChange} />
          <div className='tickets-block'>
            <div className='tabs-block'>
              <div className={`cheap-tickets black-text ${this.state.searchType === 'cheap' ? 'active' : ''}`} data-search='cheap' onClick={this.searchTypeChange}>Самый дешевый</div>
              <div className={`fast-tickets black-text ${this.state.searchType === 'fast' ? 'active' : ''}`} data-search='fast' onClick={this.searchTypeChange}>Самый быстрый</div>
            </div>
            {this.renderTickets(this.state.searchType)}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
