using Swashbuckle.AspNetCore.Annotations;

namespace PostManagementAPI.DTOs
{
    public class MovieResponseDto
    {
        [SwaggerSchema(Description = "Unique identifier for the movie")]
        public int Id { get; set; }
        
        [SwaggerSchema(Description = "The title of the movie")]
        public string Title { get; set; } = string.Empty;
        
        [SwaggerSchema(Description = "Genre of the movie (e.g., Action, Drama, Comedy)")]
        public string? Genre { get; set; }
        
        [SwaggerSchema(Description = "Rating from 1 to 5")]
        public int? Rating { get; set; }
        
        [SwaggerSchema(Description = "Poster image URL (Cloudinary URL or external URL)")]
        public string? PosterImageUrl { get; set; }
        
        [SwaggerSchema(Description = "Timestamp when the movie was created")]
        public DateTime CreatedAt { get; set; }
        
        [SwaggerSchema(Description = "Timestamp when the movie was last updated")]
        public DateTime UpdatedAt { get; set; }
    }
}
