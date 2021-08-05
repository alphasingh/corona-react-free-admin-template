import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import Slider from "react-slick";
import {TodoListComponent} from '../apps/TodoList'
import {VectorMap} from "react-jvectormap"

const mapData = {
    "BZ": 75.00,
    "US": 56.25,
    "AU": 15.45,
    "GB": 25.00,
    "RO": 10.25,
    "GE": 33.25
}

function showStatus(status) {
    let divWithStatus = <div className="badge badge-outline-warning">{status}</div>;
    if (status === "VERIFIED") {
        divWithStatus = <div className="badge badge-outline-success">{status}</div>;
    }
    return divWithStatus;
}

function showDescription(description) {
    if (description.length > 50) {
        description = description.substr(0, 50) + "...";
    }
    return description;
}

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/alphasingh/mocking-api/master/sellers.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.sellers
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    transactionHistoryData = {
        labels: ["Paypal", "Stripe", "Cash"],
        datasets: [{
            data: [55, 25, 20],
            backgroundColor: [
                "#111111", "#00d25b", "#ffab00"
            ]
        }
        ]
    };

    transactionHistoryOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 70,
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        }
    }

    sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    toggleProBanner() {
        document.querySelector('.proBanner').classList.toggle("hide");
    }

    render() {
        const items = this.state.items;
        return (
            <div>
                <div className="row ">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Sellers</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th> S# </th>
                                            <th> Name</th>
                                            <th> description</th>
                                            <th> Price</th>
                                            <th> imageUrl</th>
                                            <th> status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {items.map((item, index) => (
                                            <tr>
                                                <td> {index+1} </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <img src={item.imageUrl} alt="face"/>
                                                        <span className="pl-2">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td> {showDescription(item.description)}</td>
                                                <td> ${item.averagePricePerPerson}</td>
                                                <td> {item.imageUrl}</td>
                                                <td> {showStatus(item.status)} </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-row justify-content-between">
                                    <h4 className="card-title">Messages</h4>
                                    <p className="text-muted mb-1 small">View all</p>
                                </div>
                                <div className="preview-list">
                                    <div className="preview-item border-bottom">
                                        <div className="preview-thumbnail">
                                            <img src={require('../../assets/images/faces/face6.jpg')} alt="face"
                                                 className="rounded-circle"/>
                                        </div>
                                        <div className="preview-item-content d-flex flex-grow">
                                            <div className="flex-grow">
                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                    <h6 className="preview-subject">Leonard</h6>
                                                    <p className="text-muted text-small">5 minutes ago</p>
                                                </div>
                                                <p className="text-muted">Well, it seems to be working now.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="preview-item border-bottom">
                                        <div className="preview-thumbnail">
                                            <img src={require('../../assets/images/faces/face8.jpg')} alt="face"
                                                 className="rounded-circle"/>
                                        </div>
                                        <div className="preview-item-content d-flex flex-grow">
                                            <div className="flex-grow">
                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                    <h6 className="preview-subject">Luella Mills</h6>
                                                    <p className="text-muted text-small">10 Minutes Ago</p>
                                                </div>
                                                <p className="text-muted">Well, it seems to be working now.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="preview-item border-bottom">
                                        <div className="preview-thumbnail">
                                            <img src={require('../../assets/images/faces/face9.jpg')} alt="face"
                                                 className="rounded-circle"/>
                                        </div>
                                        <div className="preview-item-content d-flex flex-grow">
                                            <div className="flex-grow">
                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                    <h6 className="preview-subject">Ethel Kelly</h6>
                                                    <p className="text-muted text-small">2 Hours Ago</p>
                                                </div>
                                                <p className="text-muted">Please review the tickets</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="preview-item border-bottom">
                                        <div className="preview-thumbnail">
                                            <img src={require('../../assets/images/faces/face11.jpg')} alt="face"
                                                 className="rounded-circle"/>
                                        </div>
                                        <div className="preview-item-content d-flex flex-grow">
                                            <div className="flex-grow">
                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                    <h6 className="preview-subject">Herman May</h6>
                                                    <p className="text-muted text-small">4 Hours Ago</p>
                                                </div>
                                                <p className="text-muted">Thanks a lot. It was easy to fix it .</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Portfolio Slide</h4>
                                <Slider className="portfolio-slider" {...this.sliderSettings}>
                                    <div className="item">
                                        <img src={require('../../assets/images/dashboard/Rectangle.jpg')}
                                             alt="carousel-item"/>
                                    </div>
                                    <div className="item">
                                        <img src={require('../../assets/images/dashboard/Img_5.jpg')}
                                             alt="carousel-item"/>
                                    </div>
                                    <div className="item">
                                        <img src={require('../../assets/images/dashboard/img_6.jpg')}
                                             alt="carousel-item"/>
                                    </div>
                                </Slider>
                                <div className="d-flex py-4">
                                    <div className="preview-list w-100">
                                        <div className="preview-item p-0">
                                            <div className="preview-thumbnail">
                                                <img src={require('../../assets/images/faces/face12.jpg')}
                                                     className="rounded-circle" alt="face"/>
                                            </div>
                                            <div className="preview-item-content d-flex flex-grow">
                                                <div className="flex-grow">
                                                    <div
                                                        className="d-flex d-md-block d-xl-flex justify-content-between">
                                                        <h6 className="preview-subject">CeeCee Bass</h6>
                                                        <p className="text-muted text-small">4 Hours Ago</p>
                                                    </div>
                                                    <p className="text-muted">Well, it seems to be working now.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted">Well, it seems to be working now. </p>
                                <div className="progress progress-md portfolio-progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}}
                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-xl-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">To do list</h4>
                                <TodoListComponent/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Visitors by Countries</h4>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-us"></i>
                                                    </td>
                                                    <td>USA</td>
                                                    <td className="text-right"> 1500</td>
                                                    <td className="text-right font-weight-medium"> 56.35%</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-de"></i>
                                                    </td>
                                                    <td>Germany</td>
                                                    <td className="text-right"> 800</td>
                                                    <td className="text-right font-weight-medium"> 33.25%</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-au"></i>
                                                    </td>
                                                    <td>Australia</td>
                                                    <td className="text-right"> 760</td>
                                                    <td className="text-right font-weight-medium"> 15.45%</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-gb"></i>
                                                    </td>
                                                    <td>United Kingdom</td>
                                                    <td className="text-right"> 450</td>
                                                    <td className="text-right font-weight-medium"> 25.00%</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-ro"></i>
                                                    </td>
                                                    <td>Romania</td>
                                                    <td className="text-right"> 620</td>
                                                    <td className="text-right font-weight-medium"> 10.25%</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <i className="flag-icon flag-icon-br"></i>
                                                    </td>
                                                    <td>Brasil</td>
                                                    <td className="text-right"> 230</td>
                                                    <td className="text-right font-weight-medium"> 75.00%</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div id="audience-map" className="vector-map"></div>
                                        <VectorMap
                                            map={"world_mill"}
                                            backgroundColor="transparent" //change it to ocean blue: #0077be
                                            panOnDrag={true}
                                            containerClassName="dashboard-vector-map"
                                            focusOn={{
                                                x: 0.5,
                                                y: 0.5,
                                                scale: 1,
                                                animate: true
                                            }}
                                            series={{
                                                regions: [{
                                                    scale: ['#3d3c3c', '#f2f2f2'],
                                                    normalizeFunction: 'polynomial',
                                                    values: mapData
                                                }]
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;