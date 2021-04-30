var config = {
    "requireArcGISLogin": false, // Does the user need to log in to ArcGIS Online or ArcGIS Server?
    "tokenUrl": 'https://www.arcgis.com/sharing/generateToken', // ArcGIS token generation URL

    "title": "Niger State Observatory",
    "start": {
        // "maxZoom": 16,
        "center": [9.6187, 6.5476],
        "zoom": 8,
        "attributionControl": true,
        "zoomControl": false
    },
    "about": {
        "title": "About <b>NigerState URO</b>",
        "contents": "<p>The Urban Observatory is an interactive exhibit that gives you the chance to compare and contrast maps of cities around the world–all from one location. It aims to make the world’s data both understandable and useful.</p><hr>This is an open-source version of the excellent <a href='https://github.com/bmcbride/bootleaf'>Bootleaf map </a>started by Bryan McBride.</p><p>It's designed for rapid web map development. See <a href='https://github.com/iag-geo/bootleaf'>https://github.com/iag-geo/bootleaf</a> for more information.</hr>"
    },
    "controls": {
        "zoom": {
            "position": "bottomright"
        },
        //fullscreen
        "fullscreenControl": {
            "pseudoFullscreen": true
    },
        "leafletGeocoder": {
            //https://github.com/perliedman/leaflet-control-geocoder
            "collapsed": false,
            "position": "topleft",
            "placeholder": "Search for a location",
            "type": "OpenStreetMap", // OpenStreetMap, Google, ArcGIS
            //"suffix": "Australia", // optional keyword to append to every search
            //"key": "AIzaS....sbW_E", // when using the Google geocoder, include your Google Maps API key (https://developers.google.com/maps/documentation/geocoding/start#get-a-key)
        },
        "TOC": {
            //https://leafletjs.com/reference-1.0.2.html#control-layers-option
            "collapsed": true,
            "uncategorisedLabel": "Other Layers",
            "position": "topright",
            "toggleAll": true
        },
        "history": {
            "position": "bottomleft"
        },
        "bookmarks": {
            "position": "bottomright",
            "places": [
                {
                    "latlng": [
                        9.6187, 6.5476
                    ],
                    "zoom": 11,
                    "name": "Minna, Niger State",
                    "id": "a148fa354ba3",
                    "editable": true,
                    "removable": false
                }
            ]
        }
    },

    "activeTool": "identify", // options are coordinates/queryWidget/filterWidget
    "basemaps": ['esriGray', 'esriDarkGray', 'esriStreets', 'OpenStreetMap'],
    "bing_key": "enter your Bing Maps key",
    "mapboxKey": "enter your MapBox key",
    // "defaultIcon": {
    // 	"imagePath": "https://leafletjs.com/examples/custom-icons/",
    // 	"iconUrl": "leaf-green.png",
    // 	"shadowUrl": "leaf-shadow.png",
    // 	"iconSize":     [38, 95],
    // 		"shadowSize":   [50, 64],
    // 		"iconAnchor":   [22, 94],
    // 		"shadowAnchor": [4, 62],
    // 		"popupAnchor":  [-3, -76]
    // },
    "tocCategories": [
        {
            "name": "GeoJSON layers",
            "layers": ["set_points"]
        },
        {
            "name": "Transport Infrastructure",
            "layers" : ["ns_major_roads", "ns_other_roads"]
        },
        {
            "name": "WMS/WFS layers",
            "layers": ["NS_LGA", "NS_SET"],
            "exclusive": false
        }
    ],
    "projections": [
        {4269: '+proj=longlat +ellps=GRS80 +datum=NAD83 +no_defs '}
    ],
    "highlightStyle": {
        "weight": 2,
        "opacity": 1,
        "color": 'white',
        "dashArray": '3',
        "fillOpacity": 0.5,
        "fillColor": '#E31A1C',
        "stroke": true
    },
    "layers": [
        //modified to settlements points
        {
            "id": "set_points",
            "name": "Settlement Points (GeoJSON)",
            "type": "geoJSON",
            "cluster": true,
            "showCoverageOnHover": true,
            "tooltipField": "NAME",
            //"minZoom": 12,
            "url": "http://localhost:8080/geoserver/nigerstate/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nigerstate%3Aniger_state_settlements&maxFeatures=10000&outputFormat=application%2Fjson",
            "icon": {
                "iconUrl": "./img/urban.png",
                "iconSize": [24,24]
            },
            "style": {
                "stroke": true,
                "fillColor": "#00FFFF",
                "fillOpacity": 0.5,
                "radius": 10,
                "weight": 0.5,
                "opacity": 1,
                "color": '#727272',
            },
            "visible": false,
            // "label": {
            // 	"name": "NAME",
            // 	"minZoom": 14
            // }
        },
        /*{
            "id": "railways",
            "name": "USA Railways (feature)",
            "type": "agsFeatureLayer",
            "url": "https://services.arcgis.com/rOo16HdIMeOBI4Mb/ArcGIS/rest/services/USA_Rail_Network/FeatureServer/0",
            "visible": false,
            "minZoom": 12,
            "useCors": false,
            "popup": true,
            "fields": ["FID","RROWNER1","RR_CLASS", "RAILROAD", "ABANDONED"],
            "style": {
                "stroke": true,
                "radius": 10,
                "weight": 2,
                "opacity": 1,
                "color": "#FF0000"
            },
            "queryWidget": {
                "queries" : [
                    {"name": "RAILROAD", "alias": "Name"}
                ],
                "outFields": [
                    {"name": "RAILROAD", "alias": "Name"},
                    {"name": "RROWNER1", "alias": "Owner"}
                ],
                "maxAllowableOffset": 10
            }
        },*/
        
        
        // my data
        
        {
            "id": "NS_SET",
            "name": "Niger State Settlements (Geoserver WMS)",
            "type": "wmsTiledLayer",
            "url": "http://localhost:8080/geoserver/nigerstate/wms?",
            "layers": "nigerstate:niger_state_settlements",
            'EPSG': 4326,
            "visible": false,
            "format": 'image/png',
            "transparent": true,
            "geomField": "geom",
            "queryWidget": {
                "queries" : [
                    {"name": "NAME", "alias": "Name", "defaultOperator": "starts with"},
                    {"name": "ADM1_NAME", "alias": "State"},
                    {"name": "ADM2_NAME", "alias": "LGA"},

                ]
            },
            "identify": {
                "layerName": "niger_state_settlements",
                "buffer": 10,
                "outFields": [
                    {"name": "NAME", "alias": "Name"},
                    {"name": "ADM1_NAME", "alias": "State"},
                    {"name": "ADM2_NAME", "alias": "LGA"},

                ]
            },
            "filters":
            [
                {"name": "adm2_en", "alias": "Name"},
                {"name": "adm1_en", "alias": "State"},
                {"name": "area_km", "alias": "Area(Sq.Km)"},
            ],
            "outFields": [
                {"name": "adm2_en", "alias": "Name"},
                {"name": "adm1_en", "alias": "State"},
                {"name": "area_km", "alias": "Area(Sq.Km)"},
            ]
        },
        {
            "id": "NS_LGA",
            "name": "Niger State LGAs (Geoserver WMS)",
            "type": "wmsTiledLayer",
            "url": "http://localhost:8080/geoserver/nigerstate/wfs",
            "layers": "nigerstate:ns_test_lga",
            'EPSG': 4326,
            "visible": true,
            "format": 'image/png',
            "transparent": true,
            "geomField": "the_geom",
            "queryWidget": {

                "queries" : [
                    {"name": "ADM2_EN", "alias": "Name", "defaultOperator": "starts with"},
                    {"name": "ADM1_EN", "alias": "State"},
                    {"name": "AREA_KM", "alias": "Area(Sq.Km)", "type": "numeric"},
                ],
                "outFields": [
                    {"name": "ADM2_EN", "alias": "LGA Name"},
                    {"name": "ADM1_EN", "alias": "State"},
                    {"name": "AREA_KM", "alias": "Area(Sq.Km)", "type": "numeric"},
                ],

            },
            "identify": {
                "layerName": "ns_test_lga",
                "buffer": 10,
                "outFields": [
                    {"name": "ADM2_EN", "alias": "Name"},
                    {"name": "ADM1_EN", "alias": "State"},
                    {"name": "AREA_KM", "alias": "Area(Sq.Km)"},

                ]
            },
            "filters":
            [
                {"name": "ADM2_EN", "alias": "Name"},
                {"name": "ADM1_EN", "alias": "State"},
                {"name": "AREA_KM", "alias": "Area(Sq.Km)"},
            ],
            "outFields": [
                {"name": "ADM2_EN", "alias": "Name"},
                {"name": "ADM1_EN", "alias": "State"},
                {"name": "AREA_KM", "alias": "Area(Sq.Km)", "type": "numeric"},
            ]
        },
        //roads
        {
            "id": "ns_other_roads",
            "name": "Other Roads (WMS)",
            "type": "wmsTiledLayer",
            "url": "http://localhost:8080/geoserver/nigerstate/wfs",
            "layers": "nigerstate:ns_other_roads",
            'EPSG': 4326,
            "visible": false,
            "format": 'image/png',
            "transparent": true,
            "geomField": "the_geom",
            "queryWidget": {

                "queries" : [
                    {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},
                ],
                "outFields": [
                   {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},
                ],

            },
            "identify": {
                "layerName": "ns_major_roads",
                "buffer": 10,
                "outFields": [
                    {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},

                ]
            },   
           
        },
        {
            "id": "ns_major_roads",
            "name": "Major Roads (WMS)",
            "type": "wmsTiledLayer",
            "url": "http://localhost:8080/geoserver/nigerstate/wfs",
            "layers": "nigerstate:ns_major_roads",
            'EPSG': 4326,
            "visible": false,
            "format": 'image/png',
            "transparent": true,
            "geomField": "the_geom",
            "queryWidget": {

                "queries" : [
                    {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},
                ],
                "outFields": [
                   {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},
                ],

            },
            "identify": {
                "layerName": "ns_major_roads",
                "buffer": 10,
                "outFields": [
                    {"name": "highway", "alias": "Road Class"},
                    {"name": "surface", "alias": "Surface Type"},
                    {"name": "lanes", "alias": "No. of Lanes"},
                    {"name": "name", "alias": "Road Name"},
                    {"name": "oneway", "alias": "One Way?"},

                ]
            },   
           
        },
          
    ]
}
