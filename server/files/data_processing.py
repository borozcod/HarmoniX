from analytics import *

import time
import csv




# GLOBAL VARIABLES
trace = True # Make true if you want a trace
full_trace = True # Make true if you want the trace to be detailed
tracks_file_name = "tracks.csv"
artists_file_name = "artists.csv"
write_file_name = "processed_tracks.csv"
csv_data = []
csv_field_names = []


def add_genres_to_tracks(tracks_field_names, tracks_data, artists_field_names, artists_data):

    if trace: print("\n[==ADDING GENRES TO TRACKS CSV==]")
    if full_trace: print("[Adding] Appending genres")
    start_time = time.time()
    
    
    for track in tracks_data:
        track_genres = []
        
        
        # check each artist
        artist_ids = string_to_list(track['id_artists'])
        for artist_id in artist_ids:
            
            if artist_id not in artists_data:
                continue
            genres = string_to_list(artists_data[artist_id]['genres'])
            
            for genre in genres:
                if genre not in track_genres:
                    track_genres.append(genre)
         
        
        track['genres'] = list_to_string(track_genres)
        
    tracks_field_names.append("genres")
   
    end_time=time.time()
    if trace: print("[Adding]", len(tracks_data),"tracks traversed.", '%.2f'%(end_time-start_time),"seconds")
    
    if full_trace: print("[Adding] Counting tracks with genres")
    start_time = time.time()
    
    count = 0
    for track in tracks_data:
        if track['genres'] != "[]":
            count = count + 1
            
    end_time=time.time()
    if trace: print("[Adding]", count, "tracks with genres", '%.2f'%(end_time-start_time),"seconds")
    
    return tracks_field_names, tracks_data
    
def remove_empty_genres_tracks(field_names, data):
    
    if trace: print("\n[==REMOVING EMPTY GENRES TRACKS==]")
    if full_trace: print("[Removing] Tracks with empty genres")
    start_time = time.time()
    
    new_data = []
    removed_tracks = []
    
    for track in data:
        if "genres" not in track.keys():
            if trace: print("[Removing] ERROR GENRES NOT IN DATA FIELD NAMES")
            return
        
        if track['genres'] == "[]":
            removed_tracks.append(track)
            continue
        new_data.append(track)
    
    end_time=time.time()
    if trace: print("[Adding]", len(removed_tracks),"tracks removed ending with", len(new_data), "tracks.", '%.2f'%(end_time-start_time),"seconds")
            
    return field_names, new_data, removed_tracks
    
def remove_lower_popular_tracks(field_names, data, popularity_min = 0):
    
    if trace: print("\n[==REMOVING LOW POPULAR TRACKS==]")
    if full_trace: print("[Removing] Tracks with popularity lower than", popularity_min)
    start_time = time.time()
    
    new_data = []
    removed_tracks = []
    
    for track in data:
        
        if int(track['popularity']) < popularity_min:
            removed_tracks.append(track)
            continue
        new_data.append(track)
    
    end_time=time.time()
    if trace: print("[Adding]", len(removed_tracks),"tracks removed ending with", len(new_data), "tracks.", '%.2f'%(end_time-start_time),"seconds")
            
    return field_names, new_data, removed_tracks
    
    
def write_to_csv(field_names, data, file_name = write_file_name):

    if trace: print("\n[==WRITING NEW TRACKS CSV==]")
    if full_trace: print("[Writing] CSV file:", file_name)
    start_time = time.time()

    with open(file_name, mode='w', newline = "", encoding="utf8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=field_names)

        writer.writeheader()
        
        for track in data:
            writer.writerow(track)
    
    end_time = time.time()
    if full_trace: print("[Writing]", len(data), "tracks and", len(field_names), "columns.", '%.2f'%(end_time-start_time),"seconds")

def main():

    # Loads the CSV's
    csv_field_names, csv_data = load_csv()
    artists_field_names, artists_data = load_artists()
    
    # Adding genres to the tracks csv
    new_field_names, new_data = add_genres_to_tracks(csv_field_names, csv_data, artists_field_names, artists_data)
    genres_count(new_field_names, new_data)
    popularity_range(new_field_names, new_data)
    
    # Remove any songs without a genre
    new_field_names, new_data, removed_tracks = remove_empty_genres_tracks(new_field_names, new_data)
    genres_count(new_field_names, new_data)
    # genres_count(new_field_names, removed_tracks)
    popularity_range(new_field_names, new_data)
    popularity_count(new_field_names, new_data, 90, 100)
    
    # Remove any songs with a popularity lower than #
    new_field_names, new_data, removed_tracks = remove_lower_popular_tracks(new_field_names, new_data, 30)
    genres_count(new_field_names, new_data)
    # genres_count(new_field_names, removed_tracks)
    popularity_range(new_field_names, new_data)
    
    top_frequent_genres(new_field_names, new_data, 10)
    top_genres(new_field_names, new_data, 300)
    
    top_song_for_genre(new_field_names, new_data, "j-pop")
    top_song_for_genre(new_field_names, new_data, "mandopop")

    
    # write_to_csv(new_field_names, new_data)
    

main()