import time
import csv

# GLOBAL VARIABLES
trace = True # Make true if you want a trace
full_trace = True # Make true if you want the trace to be detailed
tracks_file_name = "tracks.csv"
artists_file_name = "artists.csv"
csv_data = []
csv_field_names = []


def load_csv(file_name=tracks_file_name):

    if trace: print("\n[==LOADING IN TRACKS CSV==]")
    if full_trace: print("[Reading] CSV file:", file_name)
    start_time = time.time()
        
    # Open CSV file
    with open(file_name, mode='r', encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
        
            # Add each row to a list of dicts
            csv_data.append(dict(row))
            
        # Catch the field names by grabbing the keys of the first dict in the list
        csv_field_names = list(csv_data[0].keys())

    end_time=time.time()
    
    if full_trace: print("[Reading]", len(csv_data), "tracks and", len(csv_field_names), "columns.", '%.2f'%(end_time-start_time),"seconds")

    return csv_field_names, csv_data
    
def load_artists(file_name = artists_file_name):

    artists_data = {}
    artists_field_names = []

    if trace: print("\n[==LOADING IN ARTISTS CSV==]")
    if full_trace: print("[Reading] CSV file:", file_name)
    start_time = time.time()
        
    # Open CSV file
    with open(file_name, mode='r', encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)

        first_artist_id = ""
        for row in csv_reader:
        
            # Add each row to a dict of dicts
            artists_data[row['id']] = dict(row)
            
            if first_artist_id == "":
                first_artist_id = row['id']
            
        # Catch the field names by grabbing the keys of the first dict in the dict
        artists_field_names = list(artists_data[first_artist_id].keys())

    end_time=time.time()
    
    if full_trace: print("[Reading]", len(artists_data), "tracks and", len(artists_field_names), "columns.", '%.2f'%(end_time-start_time),"seconds")

    return artists_field_names, artists_data


def popularity_count(field_names, data, popularity_min = 0, popularity_max = 100):
    
    if full_trace: print("[Count] Popularity between", popularity_min, "and", popularity_max)
    start_time = time.time()
    
    count = 0
    for track in data:
        if int(track['popularity']) >= popularity_min and int(track['popularity']) <= popularity_max:
            count = count + 1
            
    end_time=time.time()
    if trace: print("[Count]", count, "tracks of that popularity.", '%.2f'%(end_time-start_time),"seconds")
    
def popularity_range(field_names, data):

    if full_trace: print("[Count] Popularity range")
    start_time = time.time()
    
    popularity_min = 100
    popularity_max = 0
    
    for track in data:
    
        if int(track['popularity']) < popularity_min:
            popularity_min = int(track['popularity'])
        if int(track['popularity']) > popularity_max:
            popularity_max = int(track['popularity'])

    end_time=time.time()
    if trace: print("[Count] Lowest popularity:", popularity_min, "Highest popularity:", popularity_max, '%.2f'%(end_time-start_time),"seconds")
    
    return popularity_min, popularity_max
    
def print_song_data(track_id, field_names, data):
    
    for track in data:
        if track['id'] == track_id:
            print(track)
            break
            
def genres_count(field_names, data):
    
    genres = {}
    
    if full_trace: print("[Count] Number of unique genres")
    start_time = time.time()
    
    for track in data:
        if "genres" not in track.keys():
            if trace: print("[Count] ERROR GENRES NOT IN DATA FIELD NAMES")
            return
        
        for genre in string_to_list(track["genres"]):
            if genre not in genres:
                genres[genre] = ""
                
    end_time=time.time()
    if trace: print("[Count]", len(genres), "unique genres.", '%.2f'%(end_time-start_time),"seconds")
    
def top_frequent_genres(field_names, data, top = 10):
    
    genres_count = {}
    
    if full_trace: print("[Count] List top frequent genres")
    start_time = time.time()
    
    for track in data:
        if "genres" not in track.keys():
            if trace: print("[Count] ERROR GENRES NOT IN DATA FIELD NAMES")
            return
        
        for genre in string_to_list(track["genres"]):
            if genre not in genres_count:
                genres_count[genre] = 0
            genres_count[genre] = genres_count[genre] + 1
    
    sorted_genres_count = sorted(genres_count.items(), key=lambda x: x[1], reverse=True)
    
    for index in range(top):
        if trace: print("[Count] #", index+1, ":", sorted_genres_count[index][0], "with", sorted_genres_count[index][1], "counts.")
    
    end_time=time.time()
    if trace: print("[Count]", len(genres_count), "unique genres.", '%.2f'%(end_time-start_time),"seconds")
    
    return sorted_genres_count


def top_genres(field_names, data, top = 10):

    genres_score = {}
    genres_count = {}
    
    if full_trace: print("[Count] List top popular genres (frequency * popularity per song)")
    start_time = time.time()
    
    for track in data:
        if "genres" not in track.keys():
            if trace: print("[Count] ERROR GENRES NOT IN DATA FIELD NAMES")
            return
        
        for genre in string_to_list(track["genres"]):
            if genre not in genres_score:
                genres_score[genre] = 0
                genres_count[genre] = 0
            genres_score[genre] = genres_score[genre] + int(track['popularity'])
            genres_count[genre] = genres_count[genre] + 1
    
    sorted_genres_score = sorted(genres_score.items(), key=lambda x: x[1], reverse=True)
    
    for index in range(top):
        if trace: print("[Count] #", index+1, ":", sorted_genres_score[index][0], "with", sorted_genres_score[index][1], "score and an average score of", '%.2f'%(1.0*(sorted_genres_score[index][1])/(genres_count[sorted_genres_score[index][0]])))
    
    end_time=time.time()
    if trace: print("[Count]", len(genres_score), "unique genres.", '%.2f'%(end_time-start_time),"seconds")
    
    return sorted_genres_score

def top_song_for_genre(field_names, data, input_genre, top = 10):
    
    tracks_score = {}
    tracks_data = {}
    
    if full_trace: print("[Count] List most popular songs for", input_genre)
    start_time = time.time()
    
    for track in data:
        if "genres" not in track.keys():
            if trace: print("[Count] ERROR GENRES NOT IN DATA FIELD NAMES")
            return
        
        if input_genre in string_to_list(track["genres"]):
            
            tracks_score[track['id']] = int(track['popularity'])
            tracks_data[track['id']] = track
    
    sorted_tracks_score = sorted(tracks_score.items(), key=lambda x: x[1], reverse=True)
    
    for index in range(top):
        track_id = sorted_tracks_score[index][0]
        track_name = tracks_data[track_id]['name']
        track_artists = ' '.join(string_to_list(tracks_data[track_id]['artists']))
        if trace: print("[Count] #", index+1, ":", track_name, "by", track_artists, "with", sorted_tracks_score[index][1], "score.")
    
    end_time=time.time()
    if trace: print("[Count]", len(tracks_data), "songs in the genre.", '%.2f'%(end_time-start_time),"seconds")
    
    return sorted_tracks_score


def string_to_list(input_string):
    input_string = input_string[1:-1]
    input_string = input_string.replace("'", "")
    input_string = input_string.replace(" ", "")
    output_list = input_string.split(",")
    if len(output_list) == 1 and output_list[0] == "":
        return []
    return output_list
    
def list_to_string(input_list):
    if len(input_list) == 0:
            return "[]"
    return "['" + "', '".join(input_list) + "']"

def main():
    
    a = 0
    # load_csv()
    # popularity_count(csv_field_names, csv_data, 50, 100)
    # genres_count(csv_field_names, csv_data)
   


main()