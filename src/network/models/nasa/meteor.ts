namespace Nasa {
  export namespace Response {
    export interface MeteorData {
      near_earth_objects: MeteorsForTimePeriod;
    }

    export interface MeteorsForTimePeriod {
      [key: string]: Meteor[]; // dynamic keys
    }

    export interface Meteor {
      id: string;
      name: string;
      estimated_diameter: {
        meters: {
          estimated_diameter_min: number;
          estimated_diameter_max: number;
        };
      };
      is_potentially_hazardous_asteroid: boolean;
      close_approach_data: CloseApproachData[];
    }

    interface CloseApproachData {
      close_approach_date_full: string;
      relative_velocity: {
        kilometers_per_second: number;
      };
    }
  }
}

export { Nasa };

namespace Home {
  export namespace Response {
    export interface MeteorData {
      near_earth_objects: MeteorsForTimePeriod;
    }

    export interface MeteorsForTimePeriod {
      [key: string]: Meteor[]; // dynamic keys
    }

    export interface MeteorsCountForTimePeriod {
      [key: string]: { count: number }; // dynamic keys
    }

    export interface Meteor {
      id: string;
      name: string;
      diameter_in_meters: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
      is_potentially_hazardous_asteroid: boolean;
      close_approach_date_full: string;
      relative_velocity: {
        kilometers_per_second: number;
      };
    }
  }
}

export { Home };
