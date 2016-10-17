namespace passport.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
        public movies;

        constructor(private movieService: passport.Services.MovieService){
            this.getMovies();
        }

        getMovies(){
            this.movies = this.movieService.getMovies().then((data)=>{
                console.log(data);
            });
        }

    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
