import {ITicket} from "@flights/modules/actions";

const filterByCompanyAndStops = (ticket: ITicket, arrForSortedTicket: Array<ITicket>, company: string, isStop: boolean | undefined) => {
  if (isStop !== undefined && company) {
    if (!!(ticket.flight.legs[0].segments[0].stops && ticket.flight.legs[0].segments[1].stops) === !!isStop) {
      if (company === ticket.flight.carrier.airlineCode) {
        arrForSortedTicket.push(ticket);
        return false;
      }
    }
  }
  if (company === ticket.flight.carrier.airlineCode && isStop === undefined) {
    arrForSortedTicket.push(ticket);
    return false;
  }
  if (isStop !== undefined && !company) {
    if (!!(ticket.flight.legs[0].segments[0].stops && ticket.flight.legs[0].segments[1].stops) === !!isStop) {
      arrForSortedTicket.push(ticket);
      return false;
    }
  }
  if (isStop === undefined && !company) {
    arrForSortedTicket.push(ticket);
    return false;
  }
};
