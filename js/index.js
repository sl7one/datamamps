const ukr_map = new Datamap({
  element: document.getElementById("datamaps"),
  scope: "ukr",
  responsive: true,
  geographyConfig: {
    popupOnHover: false,
    highlightOnHover: true,
    highlightBorderColor: "white",
    highlightFillColor: "rgba(255,255,0,0.15)",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 0.1,
    dataUrl: "/js/datamaps/ukr.topo.json",
    animate: true,
    popupTemplate: function (geography, data) {
      return '<div class="hoverinfo">' + geography.properties.name + "</div>";
    },
  },
  done: function (datamap) {
    datamap.svg
      .selectAll(".datamaps-subunit")
      .on("click", function (geography) {
        alert(geography.properties.name);
      });
  },

  fills: {
    lv: "blue",
    MINOR: "rgba(255,255,255,0.2)",
    defaultFill: "rgba(255,255,255,0.1)",
  },

  data: {
    KV: { fillKey: "MINOR" },
    MY: { fillKey: "MINOR" },
    LV: { fillKey: "MINOR" },
  },

  setProjection: function (element) {
    var projection = d3.geo
      .mercator()
      .center([30.86577682306325, 49.72923264962771]) // always in [East Latitude, North Longitude]
      .rotate([0, 0])
      .scale(3500)
      .translate([element.offsetWidth / 2, element.offsetHeight / 3]);
    var path = d3.geo.path().projection(projection);
    return { path: path, projection: projection };
  },
});

const bubbles = [
  {
    city: "Odessa",
    customData: "CUSTOM DATA 1",
    borderWidth: 2,
    borderOpacity: 1,
    borderColor: "red",
    radius: 7,
    animate: true,
    highlightOnHover: true,
    highlightFillColor: "green",

    latitude: 46.47179729207863,
    longitude: 30.44189395004606,
  },
  {
    city: "Kyiv",
    customData: "CUSTOM DATA 2",
    borderWidth: 2,
    borderOpacity: 1,
    borderColor: "orange",
    radius: 7,
    highlightOnHover: true,
    highlightFillColor: "green",
    latitude: 50.46133538464441,
    longitude: 30.517495024343763,
  },
  {
    city: "Lviv",
    borderWidth: 2,

    customData: "CUSTOM DATA 3",
    radius: 10,
    fillKey: "lv",
    borderColor: "blue",
    radius: 7,
    latitude: 49.84550228842759,
    longitude: 24.017726253741074,
  },
];

ukr_map.bubbles(bubbles, {
  popupTemplate: function (geo, data) {
    const popup = `<div class="hoverinfo-custom">
        <span>City: ${data.city}</span>
        <span>Custom DATA: ${data.customData}</span>
         </div>`;
    return popup;
  },
});

window.addEventListener("resize", function () {
  ukr_map.resize();
});
