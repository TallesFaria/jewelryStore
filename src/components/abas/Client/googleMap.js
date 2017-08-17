import React from 'react';
import { connect } from 'react-redux';
import Home from '../../home';
import ClientOperations from './ClientOperations';

const INITIAL_LOCATION = {
    address: 'London, United Kingdom',
    position: {
        latitude: 51.5085300,
        longitude: -0.1257400
    }
};

const INITIAL_MAP_ZOOM_LEVEL = 15;

const ATLANTIC_OCEAN = {
    latitude: 29.532804,
    longitude: -55.491477
};

const GoogleMap = React.createClass({
    getInitialState() {
        return {
            isGeocodingError: false,
            foundAddress: this.props.currentClient.endereco
        };
    },


    componentDidMount() {
        const mapElement = this.mapElement;

        this.map = new google.maps.Map(mapElement, {
            zoom: INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        this.geocoder = new google.maps.Geocoder();
    },

    setSearchInputElementReference(inputReference) {
        this.searchInputElement = inputReference;
    },

    setMapElementReference(mapElementReference) {
        this.mapElement = mapElementReference;
    },

    geocodeAddress(address) {
        this.geocoder.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                // console.log("results[0].formatted_address ", results[0].formatted_address);
                // console.log("results[0].geometry.location ", results[0].geometry.location);
                // console.log("results[0].geometry.location ", results[0].geometry.location);
                this.setState({
                    foundAddress: results[0].formatted_address,
                    isGeocodingError: false
                });

                this.map.setCenter(results[0].geometry.location);

                this.marker.setPosition(results[0].geometry.location);

                return;
            }

            this.setState({
                foundAddress: null,
                isGeocodingError: true
            });

            this.map.setCenter({
                lat: ATLANTIC_OCEAN.latitude,
                lng: ATLANTIC_OCEAN.longitude
            });

            this.marker.setPosition({
                lat: ATLANTIC_OCEAN.latitude,
                lng: ATLANTIC_OCEAN.longitude
            });
        });
    },

    handleFormSubmit(submitEvent) {
        submitEvent.preventDefault();

        const address = this.searchInputElement.value;

        this.geocodeAddress(address);
    },

    render() {
        const client = this.props.currentClient;
        //const addressToRender = this.props.address
        return (
            <div>
                <Home />
                <ClientOperations />
                <div className="agenda">

                    <div className="row">
                        <div className="col-sm-12">

                            <form className="form-inline" onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="col-xs-8 col-sm-10">

                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="address">Address</label>
                                            <input
                                                defaultValue={client.endereco}
                                                type="text" className="input-agenda button-map" id="address"
                                                placeholder="London, United Kingdom"
                                                ref={this.setSearchInputElementReference} required
                                            />
                                        </div>

                                    </div>
                                    <div className="col-xs-4 col-sm-2">

                                        <button type="submit" className="input-agenda button-map">
                                            <span className="glyphicon glyphicon-search" aria-hidden="true" />
                                        </button>

                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">

                            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> :
                                <p className="bg-info">
                                    {this.state.foundAddress}</p>}

                            <div className="map" ref={this.setMapElementReference} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        acertos: state.acertos,
        currentClient: state.currentClient.client
    };
};

export default connect(mapStateToProps)(GoogleMap);
