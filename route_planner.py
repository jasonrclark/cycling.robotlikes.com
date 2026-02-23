#!/usr/bin/env python3
"""
Route Recommendation + "Ride Like This" Planner

Uses past ride history and AI to suggest personalized route recommendations
and pacing strategies based on the cyclist's historical performance.
"""

import json
import os
import sys
from pathlib import Path


def load_rides(rides_file):
    """Load ride history from JSON file."""
    try:
        with open(rides_file) as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: rides.json not found at {rides_file}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: rides.json contains invalid JSON: {e}")
        sys.exit(1)


def analyze_ride_patterns(rides):
    """Analyze past ride data to extract performance patterns."""
    if not rides:
        return {}

    distances = [r.get("distance") for r in rides]
    distances = [d for d in distances if d is not None]
    speeds = [r["average_speed"] for r in rides if r.get("average_speed") is not None]
    max_speeds = [r["max_speed"] for r in rides if r.get("max_speed") is not None]
    durations = [r["duration"] for r in rides]

    sorted_distances = sorted(distances)
    n = len(sorted_distances)
    short_rides = [
        r for r in rides
        if r.get("distance") is not None
        and r["distance"] < sorted_distances[n // 3]
        and r.get("average_speed") is not None
    ]
    long_rides = [
        r for r in rides
        if r.get("distance") is not None
        and r["distance"] >= sorted_distances[2 * n // 3]
        and r.get("average_speed") is not None
    ]

    route_names = [r.get("where_to", "") for r in rides if r.get("where_to")]
    unique_routes = list(dict.fromkeys(route_names))

    return {
        "count": len(rides),
        "avg_distance": sum(distances) / len(distances),
        "max_distance": max(distances),
        "min_distance": min(distances),
        "avg_speed": sum(speeds) / len(speeds) if speeds else 0,
        "max_speed": max(max_speeds) if max_speeds else 0,
        "avg_duration_minutes": sum(durations) / len(durations) / 60,
        "short_ride_avg_speed": (
            sum(r["average_speed"] for r in short_rides) / len(short_rides)
            if short_rides else None
        ),
        "long_ride_avg_speed": (
            sum(r["average_speed"] for r in long_rides) / len(long_rides)
            if long_rides else None
        ),
        "common_routes": unique_routes[:10],
    }


def build_prompt(preferences, patterns):
    """Build the AI prompt from rider history and user preferences."""
    route_list = ", ".join(patterns["common_routes"][:5]) if patterns["common_routes"] else "none recorded"

    short_speed = (
        f"{patterns['short_ride_avg_speed']:.1f} mph"
        if patterns["short_ride_avg_speed"] else "unknown"
    )
    long_speed = (
        f"{patterns['long_ride_avg_speed']:.1f} mph"
        if patterns["long_ride_avg_speed"] else "unknown"
    )

    return f"""You are a cycling route planner and coach. Based on this cyclist's ride history and \
today's preferences, provide a specific route recommendation with a pacing strategy.

Cyclist's Historical Performance:
- Total rides logged: {patterns['count']}
- Average ride distance: {patterns['avg_distance']:.1f} miles
- Maximum ride distance: {patterns['max_distance']:.1f} miles
- Minimum ride distance: {patterns['min_distance']:.1f} miles
- Average speed: {patterns['avg_speed']:.1f} mph
- Top recorded speed: {patterns['max_speed']:.1f} mph
- Average speed on shorter rides: {short_speed}
- Average speed on longer rides: {long_speed}
- Average ride duration: {patterns['avg_duration_minutes']:.0f} minutes
- Example past routes: {route_list}

Today's Preferences:
- Desired distance: {preferences['distance']} miles
- Effort level: {preferences['effort']}
- Preferred surface: {preferences['surface']}
- Available time: {preferences['time']} minutes

Please provide:
1. A route recommendation (type of route, key characteristics, estimated elevation)
2. A pacing strategy with target speeds for warm-up, main effort, and cool-down segments
3. Two or three tips tailored to this rider's historical data
4. Estimated completion time based on the rider's typical pace

Ground the advice in the cyclist's actual performance history."""


def get_route_recommendation(preferences, ride_patterns, api_key):
    """Use OpenAI to generate a route recommendation."""
    from openai import OpenAI, OpenAIError

    client = OpenAI(api_key=api_key)
    prompt = build_prompt(preferences, ride_patterns)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=800,
        )
    except OpenAIError as e:
        print(f"\nError calling OpenAI API: {e}")
        sys.exit(1)

    return response.choices[0].message.content


def get_preferences():
    """Interactively collect and validate user preferences."""
    print("\n🗺️  Enter your route preferences:")

    while True:
        distance_str = input("  Desired distance in miles [10]: ").strip() or "10"
        try:
            distance = float(distance_str)
            if distance <= 0:
                raise ValueError
            break
        except ValueError:
            print("  Please enter a positive number for distance.")

    valid_efforts = {"easy", "moderate", "hard"}
    while True:
        effort = (input("  Effort level - easy / moderate / hard [moderate]: ").strip() or "moderate").lower()
        if effort in valid_efforts:
            break
        print(f"  Please enter one of: {', '.join(sorted(valid_efforts))}.")

    valid_surfaces = {"road", "gravel", "mixed"}
    while True:
        surface = (input("  Preferred surface - road / gravel / mixed [road]: ").strip() or "road").lower()
        if surface in valid_surfaces:
            break
        print(f"  Please enter one of: {', '.join(sorted(valid_surfaces))}.")

    while True:
        time_str = input("  Available time in minutes [60]: ").strip() or "60"
        try:
            time_val = int(time_str)
            if time_val <= 0:
                raise ValueError
            break
        except ValueError:
            print("  Please enter a positive whole number for time.")

    return {
        "distance": distance,
        "effort": effort,
        "surface": surface,
        "time": time_val,
    }


def main():
    print("🚴  Route Recommendation + \"Ride Like This\" Planner")
    print("=" * 52)

    rides_file = Path(__file__).parent / "rides.json"

    rides = load_rides(rides_file)
    patterns = analyze_ride_patterns(rides)

    print(f"\n📊 Loaded {patterns['count']} rides from history")
    print(f"   Average distance : {patterns['avg_distance']:.1f} miles")
    print(f"   Average speed    : {patterns['avg_speed']:.1f} mph")

    preferences = get_preferences()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("\nError: OPENAI_API_KEY environment variable not set.")
        print("  export OPENAI_API_KEY=your_key_here")
        sys.exit(1)

    print("\n🤖 Generating your personalized route recommendation...")

    recommendation = get_route_recommendation(preferences, patterns, api_key)

    print("\n" + "=" * 52)
    print("🗺️  YOUR PERSONALIZED ROUTE RECOMMENDATION")
    print("=" * 52)
    print(recommendation)
    print("=" * 52)


if __name__ == "__main__":
    main()
