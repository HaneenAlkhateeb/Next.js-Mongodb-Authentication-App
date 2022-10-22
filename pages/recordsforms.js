import Records from '../components/Records';
import Forms from '../components/Forms';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="card-body">
                        <Records />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <Forms />
                    </div>
                </div>
            </div>
        </div>
    );
}