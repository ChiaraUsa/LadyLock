const datePicker = new DayPilot.Navigator("nav", {
    showMonths: 2,
    skipMonths: 2,
    selectMode: "Month",
    onTimeRangeSelected: args => {
      calendar.update({
        startDate: args.day
      });
      calendar.events.load("/api/events");
    }
  });
  datePicker.init();

  const calendar = new DayPilot.Month("dp", {
    eventEndSpec: "Date",
    eventHeight: 30,
    eventBarVisible: false,
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event");
      calendar.clearSelection();
      if (modal.canceled) {
        return;
      }
      const params = {
        start: args.start,
        end: args.end,
        text: modal.result
      };
      const {data} = await DayPilot.Http.post('/api/events/create', params);
      calendar.events.add(data);
    },
    onEventMove: async (args) => {
        const params = {
          id: args.e.id(),
          start: args.newStart,
          end: args.newEnd
        };
        const {data} = await DayPilot.Http.post('/api/events/move', params);
    },
    onEventResize: async (args) => {
        const params = {
          id: args.e.id(),
          start: args.newStart,
          end: args.newEnd
        };
        const {data} = await DayPilot.Http.post('/api/events/move', params);
    },
    onBeforeEventRender: args => {
      const color = args.data.color || app.colors.gray;
      args.data.backColor = color;
      args.data.borderColor = "darker";
      args.data.fontColor = "#ffffff";
      args.data.areas = [
        {
          top: 6,
          right: 6,
          width: 18,
          height: 18,
          symbol: "../icons/daypilot.svg#minichevron-down-2",
          action: "ContextMenu",
          backColor: "#ffffff",
          fontColor: "#666666",
          style: "border: 1px solid #ccc; cursor:pointer; border-radius: 15px;"
        }
      ];
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args) => {
            const e = args.source;
            const params = {
              id: e.id()
            };

            const {data} = await DayPilot.Http.post('/api/events/delete', params);
            calendar.events.remove(e);
          }
        },
        {
          text: "-"
        },
        {
          text: "Blue",
          icon: "icon icon-blue",
          onClick: (args) => {
            app.updateColor(args.source, app.colors.blue);
          }
        },
        {
          text: "Green",
          icon: "icon icon-green",
          onClick: (args) => {
            app.updateColor(args.source, app.colors.green);
          }
        },
        {
          text: "Yellow",
          icon: "icon icon-yellow",
          onClick: (args) => {
            app.updateColor(args.source, app.colors.yellow);
          }
        },
        {
          text: "Red",
          icon: "icon icon-red",
          onClick: (args) => {
            app.updateColor(args.source, app.colors.red);
          }
        }, {
          text: "Auto",
          onClick: (args) => {
            app.updateColor(args.source, "auto");
          }
        },

      ]
    })
  });
  calendar.init();

  const app = {
    colors: {
      blue: "#2e78d6",
      green: "#6aa84f",
      yellow: "#efb914",
      red: "#cc4125",
      gray: "#808080",
    },
    elements: {
      previous: document.querySelector("#previous"),
      next: document.querySelector("#next"),
    },
    async updateColor(e, color) {
      const params = {
        id: e.id(),
        color: color
      };
      const {data} = await DayPilot.Http.post('/api/events/setColor', params);
      e.data.color = color;
      calendar.events.update(e);
    },
    init() {
      app.elements.previous.addEventListener("click", () => {
        const current = datePicker.selectionDay;
        datePicker.select(current.addMonths(-1));
      });
      app.elements.next.addEventListener("click", () => {
        const current = datePicker.selectionDay;
        datePicker.select(current.addMonths(1));
      });

      calendar.events.load("/api/events");
    }
  };

  app.init();